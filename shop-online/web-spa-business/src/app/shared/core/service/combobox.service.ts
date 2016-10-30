import { BaseHttpService } from './base.http.service';

export abstract class ComboboxService {
    value: string;
    label: string;
    item: any[];
    filter: any;

    constructor(valueMember: string, lableMember: string) {
        this.value = valueMember;
        this.label = lableMember;
    }

    abstract getItems(filter: any): Promise<{value: string, label: string}[]>;

    getValue(item: any) {
        return item[this.value];
    }

    getLabel(item: any) {
        return item[this.label];
    }
}

export class RefComboboxService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('value','label');
    }
    

    getItems(filter: any): Promise<{value: string, label: string}[]> {


        return Promise.resolve([]);
    }
}