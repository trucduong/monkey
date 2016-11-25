import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Shop, ShopService } from './shared/index';
import { EditController, AlertType, FormInfo, FormFieldInfo,
    RefComboboxService, CMB_FILTERS,
    TextFieldInfo, CmbFieldInfo, EmailFieldInfo } from './../shared/index';

import { RefEmployeeService } from '../employee/index';


@Component({
    selector: 'shop',
    templateUrl: 'src/app/shop/shop.html'
})

export class ShopCmp extends EditController<Shop> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private shopService: ShopService) {
        super(route, router, translate);
    }

    ngOnInit() {
        this.showLoading();

        this.formInfo = this.createForm();
        this.formInfo.model[this.idColumnName] = '-1';

        this.isEditing = true;

        this.load('0').then(data => {
            this.formInfo.model = data;
        }).catch(err => {
            this.log(err);
        });

        this.hideLoading();
    }

    getCurrentUrl(): string {
        return '/shop';
    }

    createForm(): FormInfo {
        let form = new FormInfo(this.getTranslator(), this.createModel(), 'shop.detail.title');
        form.addField(new TextFieldInfo(this.getTranslator(), 'name', 'shop.name', true, 0, 100));

        form.addField(new TextFieldInfo(this.getTranslator(), 'taxCode', 'shop.taxCode', true, 0, 100));

        let refEmployeeService = new RefEmployeeService(this.shopService);
        form.addField(new CmbFieldInfo(this.getTranslator(), refEmployeeService, 'ownerId', 'shop.owner', false));

        form.addField(new TextFieldInfo(this.getTranslator(), 'phone', 'shop.phone', false, 0, 20));

        form.addField(new TextFieldInfo(this.getTranslator(), 'email', 'shop.email', false, 0, 100));

        return form;
    }

    createModel(): Shop {
        let model = new Shop()
        return model;
    }

    load(id: any): Promise<Shop> {
        return this.shopService.getShop(id);
    }

    save(model: Shop): Promise<Shop> {
        return this.shopService.updateShop(model);
    }
}
