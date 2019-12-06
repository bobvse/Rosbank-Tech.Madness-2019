import { Pipe, PipeTransform } from '@angular/core';
import { ILibGridDefinition } from 'app/library/components/lib-grid.component/lib-grid.component';

@Pipe({name: 'libGridCellWidth'})
export class LibGridCellWidthPipe implements PipeTransform {
    public transform(width: string, correlation: number, columnsLength: number): string {
        let result: string = width;
        if (!result) {
            result = (100 / columnsLength) + '%';
        }
        return correlation && `calc(${result} + ${correlation}px)` || result;
    }
}
