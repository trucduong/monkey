import { ComboboxService, BaseHttpService, SERVICES } from '../../../shared/index';

export class RefSupplierService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('supplier.list', 'value','label');
    }
    
    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.supplier, SERVICES.ACTIONS.READ_ALL, [])
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