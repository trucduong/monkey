import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Product, ProductService, RefProductGroupService } from '../../shared/index';
import { EditController, AlertType, FormInfo, FormFieldInfo,
    RefComboboxService, CMB_FILTERS,
    TextFieldInfo, CheckboxFieldInfo, CmbFieldInfo, NumberFieldInfo } from '../../../shared/index';

@Component({
    selector: 'product-detail',
    templateUrl: 'src/app/product/detail/detail.html'
})

export class ProductPricesDetailCmp extends EditController<Product> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private productService: ProductService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/product-detail';
    }

    createForm(): FormInfo {
        let form = new FormInfo(this.getTranslator(), this.createModel(), 'product.detail.title');
        //form.createField('id', 'product.detail.id');
        //form.createField('code', 'product.detail.code');
        form.addField(new TextFieldInfo(this.getTranslator(), 'name', 'product.name', true, 0, 100));
        //(<CheckboxFieldInfo> form.addField(new CheckboxFieldInfo(this.getTranslator(), 'image', 'product.detail.image', true)));

        let refService = new RefComboboxService(this.productService);
        let unitField = new CmbFieldInfo(this.getTranslator(), refService, 'unit', 'product.unit', true);
        unitField.filter = CMB_FILTERS.UNIT;
        form.addField(unitField);
        
        let refProductGroupService = new RefProductGroupService(this.productService);
        form.addField(new CmbFieldInfo(this.getTranslator(), refProductGroupService, 'group', 'product.group', true));

        form.createField('description', 'product.description');

        let statusField = new CmbFieldInfo(this.getTranslator(), refService, 'status', 'product.status', true);
        statusField.filter = CMB_FILTERS.PRODUCT_STATUS;
        form.addField(statusField);

        form.addField(new NumberFieldInfo(this.getTranslator(), 'warningRemaining', 'product.warningRemaining', true, 0, 10000));

        return form;
    }

    createModel(): Product {
        let model = new Product()
        model.warningRemaining = 0;
        model.status = 'ACTIVE'
        
        return model;
    }

    load(id: any): Promise<Product> {
        return this.productService.getProduct(id);
    }

    save(model: Product): Promise<Product> {
        return this.productService.saveProduct(model, this.isEditing);
    }
}