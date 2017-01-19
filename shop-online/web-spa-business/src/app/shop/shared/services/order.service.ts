import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { OrderDetailModel, OrderModel } from '../models/order.model';
import { BaseHttpService, SERVICES } from '../../../shared/index';


@Injectable()
export class OrderService extends BaseHttpService {

    constructor(http: Http) {
        super(http)
    }

    createOrder(order:OrderModel) {
        return this.post(SERVICES.URLS.order, SERVICES.ACTIONS.CREATE, order, []);
    }

    downloadOrder(orderId: any) {
        window.open(SERVICES.URLS.order + SERVICES.ACTIONS.DOWNLOAD_ORDER + '/' + orderId);
    }

}