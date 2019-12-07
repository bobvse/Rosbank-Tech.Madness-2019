import {DocumentPriorityEnum, IDocumentModel} from 'app/models/IDocument.model';

export class Document implements IDocumentModel {
    public selected: boolean = false;
    constructor(
        public name: string,
        public price: number,
        public priority: DocumentPriorityEnum = DocumentPriorityEnum.default
    ) {}
}
