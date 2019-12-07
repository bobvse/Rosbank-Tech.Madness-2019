import { ComponentFactoryResolver, Pipe, PipeTransform } from '@angular/core';
import { LibGridCellAnchorDirective } from 'app/library/components/lib-grid.component/directives/lib-grid-cell-anchor.directive';
import { ILibGridDefinition, LibGridCellTypes } from 'app/library/components/lib-grid.component/lib-grid.component';

@Pipe({name: 'libGridCellValueView'})
export class LibGridCellValueViewPipe implements PipeTransform {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    public transform(
        value: object,
        definition: ILibGridDefinition<any>
    ) {
        switch (definition.type) {
            // case LibGridCellTypes.Component: this.initComponent(value, definition, viewAnchor); break;
            case LibGridCellTypes.String:
            default: return definition.valueGetter &&
                definition.valueGetter(value) ||
                definition.field &&
                this.getValueByPath(value, definition.field) || '';
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

    private initComponent(
        value: object,
        definition: ILibGridDefinition<any>,
        viewAnchor: LibGridCellAnchorDirective
    ) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(definition.component);
        const viewContainerRef = viewAnchor.viewContainerRef;
        viewContainerRef.clear();
        definition.renderComponent(value, viewContainerRef.createComponent(componentFactory));
    }
}
