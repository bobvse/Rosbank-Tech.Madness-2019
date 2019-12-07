import {Directive, Input, ViewContainerRef} from '@angular/core';
import {ILibGridDefinition} from 'app/library/components/lib-grid.component/lib-grid.component';

@Directive({
    selector: '[libGridCellAnchor]'
})
export class LibGridCellAnchorDirective {
    @Input() public libGridCellAnchor: ILibGridDefinition<any>;
    @Input() public libGridCellAnchorInstance: any;
    constructor(public viewContainerRef: ViewContainerRef) {}
}
