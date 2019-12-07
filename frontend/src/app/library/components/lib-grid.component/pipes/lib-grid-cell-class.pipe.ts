import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'libGridCellClass'})
export class LibGridCellClassPipe implements PipeTransform {
    public transform(value: (() => string) | string) {
        switch (typeof value) {
            case 'function': {
                const result = value();
                return result && ' ' + result || '';
            }
            case 'string': return value && ' ' + value || '';
        }
    }
}
