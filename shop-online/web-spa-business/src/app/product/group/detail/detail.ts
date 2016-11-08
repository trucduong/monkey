import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ProductService, ProductGroup } from '../../shared/index';
import { EditController, AlertType, FormInfo, TextFieldInfo } from '../../../shared/index';

@Component({
    selector: 'product-group-detail',
    templateUrl: 'src/app/product/group/detail/detail.html'
})

export class ProductGroupDetailCmp extends EditController<ProductGroup> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private productService: ProductService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/product-group-detail';
    }

    createForm(): FormInfo {
        let form = new FormInfo(this.getTranslator(), this.createModel(), 'product.group.detail.title');
        form.addField(new TextFieldInfo(this.getTranslator(), 'name', 'product.group.name', true, 0, 100));
        form.createField('description', 'product.group.description');
        return form;
    }

    createModel(): ProductGroup {
        let model = new ProductGroup()
        return model;
    }

    load(id: any): Promise<ProductGroup> {
        return this.productService.getProductGroup(id);
    }

    save(model: ProductGroup): Promise<ProductGroup> {
        return this.productService.saveProductGroup(model, this.isEditing);
    }
}