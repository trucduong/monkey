import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';

import {Warehouse} from '../models/warehouse'
import {ImportModel} from '../models/import.model'

@Injectable()
export class WarehouseService extends BaseHttpService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Warehouse
     */
    getWarehouses() {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.READ_ALL, []);
    }

    getWarehouse(id: string) {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.READ, [id]);
    }

    saveWarehouse(item: Warehouse, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.warehouse, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.warehouse, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteWarehouse(id: string) {
        return this.post(SERVICES.URLS.warehouse, SERVICES.ACTIONS.DELETE, {}, [id]);
    }

    /**
     * import
     */
    importProducts(importModel: ImportModel) {
        return this.post(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_IMPORT, importModel, []);
    }

    getImportHistories() {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_IMPORT_HISTORY, []);
    }
    
}