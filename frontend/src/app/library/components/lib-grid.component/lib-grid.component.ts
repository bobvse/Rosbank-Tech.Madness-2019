import {
    ChangeDetectorRef,
    Component, ComponentFactoryResolver,
    ComponentRef, ElementRef, EventEmitter,
    HostBinding,
    Input, Output, QueryList, ViewChild, ViewChildren,
} from '@angular/core';
import { LayoutService } from 'app/services/layout.service';
import { Subscription } from 'rxjs';
import {LibGridCellAnchorDirective} from 'app/library/components/lib-grid.component/directives/lib-grid-cell-anchor.directive';

export enum LibGridCellTypes {
    String = 'string',
    Component = 'component',
}

export interface ILibGridDefinition<InstanceType> {
    title: string;
    field?: string;
    cellClass?: string;
    valueGetter?: (instance: InstanceType) => string;
    type?: LibGridCellTypes;
    renderComponent?: (instance: InstanceType, component: ComponentRef<any>) => void;
    component?: any;
    width?: string;
    resizeCorrelation?: number;
    calculatedWidth?: string;
    cellClick?: (instance: InstanceType) => void;
    cellDoubleClick?: (instance: InstanceType) => void;
}

@Component({
    selector: 'lib-grid',
    templateUrl: 'lib-grid.component.html',
    styleUrls: ['lib-grid.component.scss'],
})
export class LibGridComponent {
    @ViewChild('tbody') private _tbody: ElementRef;
    private _anchors: QueryList<LibGridCellAnchorDirective>;
    public structureIsDirty: boolean;
    @ViewChildren(LibGridCellAnchorDirective)
    private get anchors() {
        return this._anchors;
    }
    private set anchors(value: QueryList<LibGridCellAnchorDirective>) {
        this._anchors = value;
        this.structureIsDirty = true;
        setTimeout(() => this.renderComponents(), 0);
        this.structureIsDirty = false;
    }
    @Output() public rowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() public rowDoubleClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() public sortChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() public definitions: ILibGridDefinition<any>[] = [];
    @Input() public enableSorting: boolean;
    @Input() public sortColumnIndex = 1;
    @Input() public manualControl: boolean;
    @Input() public width: number | string = 100;
    @Input() public height: number | string = 100;
    @Input() public autoPageSize: boolean;
    @Input() public selectedOrderColumn: ILibGridDefinition<any>;
    @Input() public selectedOrderDirection: 'asc' | 'desc';
    @Input() public loading: boolean;
    private pageMouseUpSubscription: Subscription;
    public sortedList: any[] = [];
    public selectedRowIndex: number;
    public currentPage = 0;
    public selectedResizeColumn: ILibGridDefinition<any>;
    private _list: any[] = [];
    public pageList: any[] = [];
    @Input() public get list(): any[] {
        return this._list || [];
    }
    public set list(value: any[]) {
        this._list = value;
        if (this.autoPageSize) {
            this.pageSize = Math.round((this._tbody.nativeElement.offsetHeight - 25) / 25);
        }
        this.filterListForPage();
    }
    public _pageSize: number;
    @Input() public get pageSize(): number {
        return this._pageSize;
    }
    public set pageSize(value: number) {
        this._pageSize = value;
        this.filterListForPage();
    }
    @HostBinding('style.width') get getWidth() {
        return (typeof this.width === 'number' || /^\d+(\.\d+)?$/.test(this.width as string)) && this.width + '%' ||
            typeof this.width === 'string' && this.width || 'auto';
    }
    @HostBinding('style.height') get getHeight() {
        return (typeof this.height === 'number' || /^\d+(\.\d+)?$/.test(this.height as string)) && this.height + '%' ||
            typeof this.height === 'string' && this.height || 'auto';
    }

    constructor(
        private layoutService: LayoutService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    public ngOnInit() {
        if (this.autoPageSize) {
            this.pageSize = this._tbody.nativeElement.offsetHeight / 25;
        }
        this.pageMouseUpSubscription = this.layoutService.listeners.pageMouseUp.subscribe(event => {
            this.selectedResizeColumn = null;
        });
    }

    public ngOnDestroy() {
        if (this.pageMouseUpSubscription) {
            this.pageMouseUpSubscription.unsubscribe();
        }
    }

    private filterListForPage() {
        this.selectedRowIndex = null;
        this.sortedList = this.sort(this.selectedOrderDirection, this.selectedOrderColumn, this.list);
        if (this.manualControl) {
            this.pageList = this.sortedList.slice(0, this.pageSize - 1);
        } else {
            this.pageList = this.sortedList.slice(
                this.currentPage * this.pageSize,
                this.currentPage * this.pageSize + this.pageSize
            );
        }
    }

    public tableResizeListener(event: Event) {
        if (this.autoPageSize) {
            this.pageSize = Math.round(((event.target as HTMLElement).offsetHeight - 25) / 25);
        }
    }

    public openPage(number: number) {
        if (number < 0) {
            number = 0;
        }
        if (number >= +Math.floor(this.list.length / this.pageSize)) {
            number = +Math.floor(this.list.length / this.pageSize);
        }
        this.currentPage = number;
        this.filterListForPage();
    }
    public getPagesLength() {
        return Math.ceil(this.list.length / this.pageSize) || 0;
    }

    public rowClickListener(item, index) {
        this.selectedRowIndex = index;
        this.rowClick.emit(item);
    }

    public headCellClickListener(columnDefinition: ILibGridDefinition<any>) {
        let orderDirection: 'asc' | 'desc';
        if (columnDefinition === this.selectedOrderColumn) {
            switch (this.selectedOrderDirection) {
                case 'asc': orderDirection = 'desc'; break;
                case 'desc': orderDirection = null; break;
                default: orderDirection = 'asc';
            }
        } else {
            orderDirection = 'asc';
        }
        this.selectedOrderDirection = orderDirection;
        this.selectedOrderColumn = columnDefinition;
        if (this.manualControl) {
            this.sortChange.emit();
        } else {
            this.filterListForPage();
        }
    }

    private getValueByPath(value: object, path: string = ''): string {
        const parsedPath = path.match(/[^\.]+/g);
        if (typeof value !== 'object' || !value || !parsedPath) {
            return '';
        }
        let cachedObject = value;
        for (let i = 0; parsedPath[i]; i++) {
            if (!cachedObject[parsedPath[i]]) {
                return '';
            }
            cachedObject = cachedObject[parsedPath[i]];
        }
        return cachedObject.toString();
    }

    public sort(
        orderDirection: 'asc' | 'desc',
        columnDefinition: ILibGridDefinition<any>,
        list: any[]
    ): any[] {
        if (!orderDirection || !columnDefinition || !(columnDefinition.field || columnDefinition.valueGetter)) {
            return list || [];
        }
        const result = list.slice();
        result.sort((a, b) => {
            let valueA;
            let valueB;
            if (columnDefinition.valueGetter) {
                valueA = columnDefinition.valueGetter(a);
                valueB = columnDefinition.valueGetter(b);
            } else {
                valueA = this.getValueByPath(a, columnDefinition.field);
                valueB = this.getValueByPath(b, columnDefinition.field);
            }
            if (valueA > valueB) {
                return orderDirection === 'asc' && -1 || 1;
            } else if (valueA < valueB) {
                return orderDirection === 'asc' && 1 || -1;
            } else {
                return 0;
            }
        });
        return result || [];
    }

    public headMouseMoveListener(event: MouseEvent) {
        if (!this.selectedResizeColumn) {
            return;
        }
        this.selectedResizeColumn.resizeCorrelation += event.layerX;
    }

    public headCellResizeDownListener(column: ILibGridDefinition<any>) {
        column.resizeCorrelation = column.resizeCorrelation || 0;
        this.selectedResizeColumn = column;
    }

    public cellClickListener(item: any, definition: ILibGridDefinition<any>, rowIndex: number) {
        if (definition.cellClick) {
            definition.cellClick(item);
        }
        this.rowClickListener(item, rowIndex)
    }

    public cellDoubleClickListener(item: any, definition: ILibGridDefinition<any>, rowIndex: number) {
        if (definition.cellDoubleClick) {
            definition.cellDoubleClick(item);
        }
        this.rowDoubleClick.emit(item);
    }

    public renderComponents() {
        (this.anchors || []).forEach(item => {
            if (!item.libGridCellAnchor.component) {
                return;
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.libGridCellAnchor.component);
            const viewContainerRef = item.viewContainerRef;
            viewContainerRef.clear();
            item.libGridCellAnchor.renderComponent(item.libGridCellAnchorInstance, viewContainerRef.createComponent(componentFactory));
        });
    }
}
