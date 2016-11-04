import { BaseHttpService } from './base.http.service';
import { SERVICES } from '../utils/service.url';

export const CMB_FILTERS = {
    UNIT: {type: 'ref.unit'},
    PRODUCT_STATUS: {type: 'ref.product.status'}
};

export abstract class ComboboxService {
    value: string;
    label: string;

    constructor(valueMember: string, lableMember: string) {
        this.value = valueMember;
        this.label = lableMember;
    }

    abstract getItems(filter: any): Promise<any[]>;

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
    
    getItems(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.ref, SERVICES.ACTIONS.READ_CMB, [filter.type + '.x'])
        .then(res => {
            // let items = [];
            // res.forEach(e => {
            //     items.push({value: e.value, label: e.label});
            // });
            return Promise.resolve(res);
        })
        .catch(err => {
            return Promise.resolve([]);
        });
    }
}