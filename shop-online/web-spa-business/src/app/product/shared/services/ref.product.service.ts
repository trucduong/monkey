import { ComboboxService, BaseHttpService, SERVICES } from '../../../shared/index';

export class RefProductService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('product.list', 'value','label');
    }
    
    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.product, SERVICES.ACTIONS.READ_ALL_REF, [])
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