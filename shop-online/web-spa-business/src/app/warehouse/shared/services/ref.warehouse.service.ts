import { ComboboxService, BaseHttpService, SERVICES } from '../../../shared/index';

export class RefWarehouseService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('warehouse.list', 'value','label');
    }
    
    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.READ_ALL, [])
        .then(res => {
            let items = [];
            res.forEach(e => {
                items.push({value: e.id, label: e.name, src: e});
            });
            return Promise.resolve(items);
        })
        .catch(err => {
            return Promise.resolve([]);
        });
    }
}