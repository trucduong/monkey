import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Product, ProductService } from '../../shared/index';
import { EditController, FormInfo, 
        TextFieldInfo, NumberFieldInfo } from '../../../shared/index';

@Component({
    selector: 'product-prices-detail',
    templateUrl: 'src/app/product/prices/detail/detail.html'
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
        let productName = form.addField(new TextFieldInfo(this.getTranslator(), 'name', 'product.name', true, 0, 100));
        productName.enabled = false;

        form.addField(new NumberFieldInfo(this.getTranslator(), 'remaining', 'product.remaining', true, 0, 0));
        form.addField(new NumberFieldInfo(this.getTranslator(), 'discount', 'product.discount', true, 0, 100));
        form.addField(new NumberFieldInfo(this.getTranslator(), 'inputPrice', 'product.inputPrice', true, 0, 0));
        form.addField(new NumberFieldInfo(this.getTranslator(), 'wholesalePrice', 'product.wholesalePrice', true, 0, 0));
        form.addField(new NumberFieldInfo(this.getTranslator(), 'retailPrice', 'product.retailPrice', true, 0, 0));

        return form;
    }

    createModel(): Product {
        let model = new Product()
        model.warningRemaining = 0;
        model.status = 'ACTIVE'
        
        return model;
    }

    load(id: any): Promise<Product> {
        return this.productService.getProductWithDetail(id);
    }

    save(model: Product): Promise<Product> {
        return this.productService.saveProductDetail(model);
    }
}