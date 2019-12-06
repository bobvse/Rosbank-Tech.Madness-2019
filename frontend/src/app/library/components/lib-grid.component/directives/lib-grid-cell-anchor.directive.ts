import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[libGridCellAnchor]'
})
export class LibGridCellAnchorDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
