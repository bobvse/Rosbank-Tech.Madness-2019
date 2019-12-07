import {Component, ViewChild} from '@angular/core';
import {ILibGridDefinition, LibGridCellTypes} from 'app/library/components/lib-grid.component/lib-grid.component';
import {DocumentPriorityDesc, DocumentPriorityEnum, IDocumentModel} from 'app/models/IDocument.model';
import {ICompanyModel} from 'app/models/ICompany.model';
import {LibPopupComponent} from 'app/library/components/lib-popup/lib-popup.component';
import {GridCheckboxComponent} from 'app/main/index.module/grid-checkbox.component/grid-checkbox.component';
import {Document} from 'app/implementations/Document.impl';
import {StackItem} from 'app/library/components/lib-field.component/lib-field.component';

@Component({
    selector: 'app-index-screen',
    templateUrl: './index.screen.component.html',
    styleUrls: ['./index.screen.component.scss']
})
export class IndexScreenComponent {
    @ViewChild('uploadPopup') public uploadPopup: LibPopupComponent;
    public company: ICompanyModel = {name: "My company", balance: 1200000, commission: 1.2};
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
        {title: 'Название', field: 'name', width: 'calc(50% - 70px)'},
        {title: 'Сумма', field: 'price', width: 'calc(50% - 70px)'},
    ];
    public documents: IDocumentModel[] = [
        new Document("My first document", 1000),
        new Document("My second document", 1200, DocumentPriorityEnum.hight),
        new Document("My third document", 1400),
        new Document("My fourth document", 1300),
        new Document("My fifth document", 900),
    ];

    public getShortAmount(amount: number) {

    }

    public async fileInputListener(event: Event) {
        this.uploadPopup.opened = false;
    }

    public async fileDropListener(event: DragEvent) {
        this.uploadPopup.opened = false;
        this.preventDefaults(event);
    }

    public preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    public setPriority(priority: DocumentPriorityEnum) {
        console.log(priority);
        const selectedDocuments = this.documents.filter(item => (<Document>item).selected);
        selectedDocuments.forEach(item => {
            (<Document>item).selected = false;
            item.priority = priority;
        });
        const documentsCache = this.documents;
        this.documents = [];
        setTimeout(() => {
            this.documents = documentsCache;
        }, 0);
        console.log(selectedDocuments);
    }
}
