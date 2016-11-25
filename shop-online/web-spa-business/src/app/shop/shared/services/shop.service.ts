import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Shop } from '../models/shop';
import { BaseHttpService, SERVICES } from '../../../shared/index';


@Injectable()
export class ShopService extends BaseHttpService {

    constructor(http: Http) {
        super(http)
    }

    getShop(id: string) {
        return this.get(SERVICES.URLS.shop, SERVICES.ACTIONS.READ, [id]);
    }

    updateShop(item: Shop) {
        return this.post(SERVICES.URLS.shop, SERVICES.ACTIONS.UPDATE, item, [item.id]);
    }

}