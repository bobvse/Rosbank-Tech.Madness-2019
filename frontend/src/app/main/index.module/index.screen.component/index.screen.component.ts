import {Component} from '@angular/core';
import {ILibGridDefinition} from 'app/library/components/lib-grid.component/lib-grid.component';
import {IDocumentModel} from 'app/models/IDocument.model';

@Component({
  selector: 'app-index-screen',
  templateUrl: './index.screen.component.html',
  styleUrls: ['./index.screen.component.scss']
})
export class IndexScreenComponent {
    public gridDefinition: ILibGridDefinition<IDocumentModel>[] = [
        {title: 'Master Policy', field: 'MasterPolicy', cellClass: 'data-hook-aggrid-cell-master-policy'},
        {title: 'Number', field: 'Number', cellClass: 'data-hook-aggrid-cell-loan-number'},
        {title: 'Customer', field: 'Customer'},
        {title: 'Address', field: 'Address'},
        {title: 'Status', field: 'Status'},
        {title: 'VIN', field: 'VIN', cellClass: 'data-hook-aggrid-cell-vin'},
        {title: 'Car', field: 'Car'},
        {title: 'Policy #', field: 'PolicyNumber'},
    ];
}
