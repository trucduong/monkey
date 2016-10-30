import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Product, ProductService } from '../shared/index';
import { EditController, AlertType, FormInfo, FormFieldInfo,
    TextFieldInfo, CheckboxFieldInfo, RadioFieldInfo } from './../../shared/index';

@Component({
    selector: 'product-detail',
    templateUrl: 'src/app/product/detail/detail.html'
})

export class ProductDetailCmp extends EditController<Product> implements OnInit {
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
        form.createField('id', 'product.detail.id');
        form.createField('code', 'product.detail.code');
        // form.createField('name', 'product.detail.name', true, 0, 10);
        form.addField(new TextFieldInfo(this.getTranslator(), form.model, 'name', 'product.detail.name', true, 0, 10));
        (<CheckboxFieldInfo> form.addField(new CheckboxFieldInfo(this.getTranslator(), form.model, 'image', 'product.detail.image', true)))
            .addItem('product.list.image.a', 'imga')
            .addItem('product.list.image.b', 'imgb')
            .addItem('product.list.image.c', 'imgc');

        //form.createField('unit', 'product.detail.unit', true);
        (<RadioFieldInfo> form.addField(new RadioFieldInfo(this.getTranslator(), form.model, 'unit', 'product.detail.unit', true)))
            .addItem('product.list.image.a', 'imga')
            .addItem('product.list.image.b', 'imgb')
            .addItem('product.list.image.c', 'imgc');
        
        form.createField('group', 'product.detail.group', true);
        form.createField('description', 'product.detail.description');
        form.createField('status', 'product.detail.status', true);
        form.createField('discount', 'product.detail.discount', true);
        form.createField('remaining', 'product.detail.remaining');
        form.createField('warningRemaining', 'product.detail.warningRemaining');
        form.createField('inputPrice', 'product.detail.inputPrice');
        form.createField('wholesalePrice', 'product.detail.wholesalePrice');
        form.createField('retailPrice', 'product.detail.retailPrice');


        return form;
    }

    createModel(): Product {
        let model = new Product()
        model.image = '[imgb]';
        model.unit = 'imgc';
        return model;
    }

    load(id: any): Promise<Product> {
        return this.productService.getProduct(id);
    }

    save(model: Product): Promise<Product> {
        this.productService.saveProduct(model, this.isEditing)
        return Promise.resolve(model);
    }
}