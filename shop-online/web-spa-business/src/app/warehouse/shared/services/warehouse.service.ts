import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';

import {Warehouse, WarehouseModel, WareHouseSearchCondition} from '../models/warehouse'

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
     * warehouse history
     */
    saveDetails(importModel: WarehouseModel, historyType: string) {
        return this.post(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_TRACKING, importModel, [historyType]);
    }

    getDetail(warehouseId: string, productId: string) {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_DETAIL, [warehouseId, productId]);
    }

    downloadDetails() {
        window.open(SERVICES.URLS.warehouse + SERVICES.ACTIONS.DOWNLOAD_DETAILS);
    }

    getHistories(condition: WareHouseSearchCondition, historyType: string) {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_HISTORY + this.buildSearchConditionStr(condition), [historyType]);
    }

    getStatus(warehouseId: string) {
        return this.get(SERVICES.URLS.warehouse, SERVICES.ACTIONS.WAREHOUSE_STATUS, [warehouseId]);
    }

    downloadStatus(warehouseId: string) {
        window.open(SERVICES.URLS.warehouse + SERVICES.ACTIONS.DOWNLOAD_STATUS + warehouseId);
    }

    private buildSearchConditionStr(condition: WareHouseSearchCondition): string {
        let paramStr = '?';
        if (condition) {
            if (condition.customerId) {
                paramStr += '&customerId=' + condition.customerId; 
            }

            if (condition.employeeId) {
                paramStr += '&employeeId=' + condition.employeeId;
            }

            if (condition.historyDateTime) {
                paramStr += '&historyDateTime=' + condition.historyDateTime;
            }

            if (condition.productId) {
                paramStr += '&productId=' + condition.productId;
            }

            if (condition.referenceNo) {
                paramStr += '&referenceNo=' + condition.referenceNo;
            }

            if (condition.supplierId) {
                paramStr += '&supplierId=' + condition.supplierId;
            }

            if (condition.warehouseId) {
                paramStr += '&warehouseId=' + condition.warehouseId;
            }
        }
        
        return paramStr;
    }
}