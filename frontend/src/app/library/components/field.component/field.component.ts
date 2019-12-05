import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  @Output() valueChange: EventEmitter<string | boolean> = new EventEmitter<string | boolean>();
  @Input() type: 'comment' | 'checkbox';
  @Input() placeholder: string;
  private _value: string | boolean;
  @Input() get value (): string | boolean {
    return this._value;
  }
  set value (value: string | boolean) {
    this._value = value;
    this.valueChange.emit(value);
  }
}
