import { ComboboxService, BaseHttpService, SERVICES } from '../../../shared/index';

export class RefEmployeeService extends ComboboxService {
    constructor(private httpService: BaseHttpService) {
        super('employee.list', 'value','label');
    }
    
    onload(filter: any): Promise<any[]> {
        return this.httpService.get(SERVICES.URLS.employee, SERVICES.ACTIONS.READ_ALL, [])
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