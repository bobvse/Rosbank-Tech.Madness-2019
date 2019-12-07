import {Component, HostBinding, HostListener} from '@angular/core';
import {Document} from 'app/implementations/Document.impl';

@Component({
    selector: 'app-grid-checkbox',
    templateUrl: './grid-checkbox.component.html',
    styleUrls: ['./grid-checkbox.component.scss']
})
export class GridCheckboxComponent {
    public instance: Document = new Document("My doc", 100);
    @HostBinding('class.selected') public get selected(): boolean {
        return this.instance.selected
    };
    @HostListener('click', ['$event']) public clickListener(event) {
        this.instance.selected = !this.instance.selected;
    }
}
