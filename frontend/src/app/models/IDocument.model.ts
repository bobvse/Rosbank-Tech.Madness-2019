export enum DocumentPriorityEnum {
    hight = 'hight',
    default = 'default',
    low = 'low',
}

export const DocumentPriorityDesc: {[key: string]: string} = {
    [DocumentPriorityEnum.hight]: 'Высокий',
    [DocumentPriorityEnum.default]: 'Обычный',
    [DocumentPriorityEnum.low]: 'Низкий',
};

export interface IDocumentModel {
    name: string;
    price: number;
    priority?: DocumentPriorityEnum;
}
