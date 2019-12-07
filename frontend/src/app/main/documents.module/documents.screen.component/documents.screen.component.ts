import {Component, ViewChild} from '@angular/core';
import {ILibGridDefinition, LibGridCellTypes} from 'app/library/components/lib-grid.component/lib-grid.component';
import {
    DocumentPriorityDesc,
    DocumentPriorityEnum,
    IDocumentModel,
    IDocumentsResponse
} from 'app/models/IDocument.model';
import {ICompanyModel} from 'app/models/ICompany.model';
import {LibPopupComponent} from 'app/library/components/lib-popup/lib-popup.component';
import {GridCheckboxComponent} from 'app/main/documents.module/grid-checkbox.component/grid-checkbox.component';
import {Document} from 'app/implementations/Document.impl';
import {StackItem} from 'app/library/components/lib-field.component/lib-field.component';
import {BackendService} from 'app/services/backend.service';
import {AppConfigEnum, ConfigService} from 'app/services/config.service';
import {IUserModel} from 'app/models/IUser.model';
import {Company} from 'app/implementations/Company.impl';
import {User} from 'app/implementations/User.impl';
import {NotifyService} from 'app/services/notify.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-documents-screen',
    templateUrl: './documents.screen.component.html',
    styleUrls: ['./documents.screen.component.scss']
})
export class DocumentsScreenComponent {
    @ViewChild('uploadPopup') public uploadPopup: LibPopupComponent;
    @ViewChild('priorityPopup') public priorityPopup: LibPopupComponent;
    @ViewChild('filterPopup') public filterPopup: LibPopupComponent;
    private pullingTimeout = 2000;
    private pullingTimeoutId: any = null;
    public company: ICompanyModel = new Company("My company", 1200000);
    public user: IUserModel = new User("login", this.company.id);
    public priorityVariantsStack: StackItem<DocumentPriorityEnum>[] = Object.keys(DocumentPriorityDesc)
        .map(item => new StackItem(DocumentPriorityEnum[item], DocumentPriorityDesc[item]));
    public gridDefinition: ILibGridDefinition<IDocumentModel>[] = [
        {
            title: '',
            component: GridCheckboxComponent,
            type: LibGridCellTypes.Component,
            renderComponent: (instance, component) => component.instance.instance = instance,
            cellClass: 'checkbox-cell',
            width: '24px'
        },
        {title: 'Приоритет', field: 'priority', width: '140px'},
        {title: 'Название', field: 'name', width: '220px'},
        {title: 'Сумма', field: 'details.cstmrCdtTrfInitn.grpHdr.ctrlSum', width: '220px'},
        {title: 'Компания', field: 'details.cstmrCdtTrfInitn.pmtInf.dbtr.nm', width: '220px'},
        {title: 'Дебитор', field: 'details.cstmrCdtTrfInitn.pmtInf.dbtr.ctctDtls.othr', width: '220px'},
    ];
    public documents: IDocumentModel[] = [];
    public filterDefinitions: {
        maxAmount: number,
        minAmount: number,
        priority: DocumentPriorityEnum,
        name: string,
    } = {
        maxAmount: undefined,
        minAmount: undefined,
        priority: undefined,
        name: undefined,
    };
    public filteredDocuments: IDocumentModel[] = this.documents;

    constructor(
        private backendService: BackendService,
        private configService: ConfigService,
        private notify: NotifyService,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.notify.show("Загрузка данных...");
        this.updateData().then(() => {
            this.notify.show("Готово");
            setTimeout(() => this.startPulling(), this.pullingTimeout);
        });
    }

    public startPulling() {
        const promise = this.updateData();
        if (!promise) {
            return;
        }
        if (this.pullingTimeoutId) {
            clearTimeout(this.pullingTimeout);
            this.pullingTimeout = null;
        }
        promise.then(() => {
            this.pullingTimeout = setTimeout(() => this.startPulling(), this.pullingTimeout);
        });
    }

    public updateData(): Promise<void> | undefined {
        const login = this.configService.get(AppConfigEnum.Login);
        if (!login) {
            this.router.navigate(['/login']).then();
            this.notify.show("Необходима авторизация", 'error');
            return;
        }
        return this.backendService.get<IUserModel>(`User/${login}`)
            .then(user => this.user = user)
            .then(() => this.backendService.get<ICompanyModel>(`Company/${this.user.companyId}`))
            .then(company => this.company = company)
            .then(() => this.backendService.get<IDocumentsResponse>(`Documents/${login}`))
            .then(response => {
                this.documents = response.documents;
                this.filterDocuments();
            })
            .catch(error => this.notify.show("Ошибка загрузки данных", 'error'));
    }

    public async uploadFile(files: FileList) {
        this.notify.show("Загрузка файлов...");
        const login = this.configService.get(AppConfigEnum.Login);
        if (!login) {
            this.router.navigate(['/login']).then();
            this.notify.show("Необходима авторизация", 'error');
            return;
        }
        const form = new FormData();
        for (let i = 0; files[i]; i++) {
            form.append('files', files[i]);
        }
        this.backendService.post(`Documents/${login}`, form)
            .then(response => {
                this.startPulling();
                this.notify.show("Готово");
            })
            .catch(error => this.notify.show("Ошибка загрузки файлов", 'error'));
    }

    public async fileInputListener(event: Event) {
        this.uploadPopup.opened = false;
        await this.uploadFile((event.target as HTMLInputElement).files);
    }

    public async fileDropListener(event: DragEvent) {
        this.uploadPopup.opened = false;
        this.preventDefaults(event);
        await this.uploadFile(event.dataTransfer.files);
    }

    public preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    public setPriority(priority: DocumentPriorityEnum) {
        const login = this.configService.get(AppConfigEnum.Login);
        if (!login) {
            this.router.navigate(['/login']).then();
            this.notify.show("Необходима авторизация", 'error');
            return;
        }
        this.notify.show("Установка приоритетов...");
        const selectedDocuments = this.documents.filter(item => (<Document>item).selected);
        selectedDocuments.forEach(item => item.priority = priority);
        Promise.all(selectedDocuments.map(item => this.backendService.put(`Documents/${login}`, item)))
            .then(() => {
                this.notify.show("Обновление данных...");
                return this.updateData();
            })
            .then(() => this.notify.show("Готово"))
            .catch(() => this.notify.show("Ошибка изменения приоритетов", 'error'));
        this.priorityPopup.opened = false;
    }

    public filterDocuments() {
        this.filteredDocuments = this.documents.filter(item => {
            let isInvalid = false;
            if (this.filterDefinitions.maxAmount !== undefined) {
                isInvalid = isInvalid || +item.price > +this.filterDefinitions.maxAmount;
            }
            if (this.filterDefinitions.minAmount !== undefined) {
                isInvalid = isInvalid || +item.price < +this.filterDefinitions.minAmount;
            }
            if (this.filterDefinitions.priority !== undefined) {
                isInvalid = isInvalid || item.priority !== this.filterDefinitions.priority;
            }
            if (this.filterDefinitions.name !== undefined) {
                const regexp = new RegExp(this.filterDefinitions.name, 'i');
                isInvalid = isInvalid || !regexp.test(item.name);
            }
            return !isInvalid;
        });
        this.filterPopup.opened = false;
    }

    public clearFilter() {
        this.filterDefinitions = {
            name: undefined,
            priority: undefined,
            minAmount: undefined,
            maxAmount: undefined,
        };
        this.filterDocuments();
    }

    public signDocuments() {
        const login = this.configService.get(AppConfigEnum.Login);
        if (!login) {
            this.router.navigate(['/login']).then();
            this.notify.show("Необходима авторизация", 'error');
            return;
        }
        this.notify.show("В процессе...");
        this.backendService.post(`Sign/${login}`, {
            DocumentsIds: this.filteredDocuments.filter(item => (<Document>item).selected),
        })
            .then(() => {
                this.notify.show("Готово");
                this.startPulling();
            })
            .catch(() => this.notify.show("Ошибка при подписании", 'error'));
    }
}
