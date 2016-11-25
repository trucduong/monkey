import { ComboboxService, BaseHttpService, SERVICES } from '../../../shared/index';

export class RefSupplierGroupService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('supplier.group', 'value','label');
    }
    
    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.READ_ALL, [])
        .then(res => {
            let items = [];
            res.forEach(e => {
                items.push({value: e.id, label: e.name});
            });
            return Promise.resolve(items);
        })
        .catch(err => {
            return Promise.resolve([]);
        });
    }
}