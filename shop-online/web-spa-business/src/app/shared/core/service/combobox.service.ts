import { BaseHttpService } from './base.http.service';
import { SERVICES } from '../utils/service.url';
import { CacheUtils } from '../utils/cache.utils';

export const CMB_FILTERS = {
    SEX: { type: 'ref.sex' },
    UNIT: { type: 'ref.unit' },
    PRODUCT_STATUS: { type: 'ref.product.status' },
    EMPLOYEE_STATUS: { type: 'ref.employee.status' },
    WAREHOUSE_STATUS: {type: 'ref.warehouse.status'},
    ACCOUNT_STATUS: { type: 'ref.account.status' },
};

export abstract class ComboboxService {
    value: string;
    label: string;
    isLoading: boolean;
    type: string;

    constructor(type: string, valueMember: string, lableMember: string) {
        this.type = type;
        this.value = valueMember;
        this.label = lableMember;

        CacheUtils.clear(this.type);
    }

    getItems(filter: any): Promise<any[]> {
        let mthis = this;
        let items = CacheUtils.get(mthis.type);

        if ((filter && filter.reload) || !items || items.length == 0) {
            mthis.isLoading = true;
            return mthis.onload(filter).then(res => {
                mthis.isLoading = false;
                CacheUtils.set(mthis.type, res);
                if (filter.filter) {
                    res = filter.filter(res);
                }
                return Promise.resolve(res);
            });
        } else {
            if (filter.filter) {
                items = filter.filter(items);
            }
            return Promise.resolve(items);
        }
    }

    abstract onload(filter: any): Promise<any[]>;

    getValue(item: any) {
        return item[this.value];
    }

    getLabel(item: any) {
        return item[this.label];
    }
}

export class RefComboboxService extends ComboboxService {
    constructor(type: string, private httpService: BaseHttpService) {
        super(type, 'value', 'label');
    }

    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.ref, SERVICES.ACTIONS.READ_CMB, [this.type])
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