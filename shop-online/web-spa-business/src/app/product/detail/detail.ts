import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Product, ProductService } from '../shared/index';
import { AlertType } from './../../shared/index';
import { EditController } from './../../shared/index';

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

    createModel(): Product {
        return new Product();
    }

    load(id: any): Product {
        return this.productService.getProduct(id);
    }

    validate(model: Product): boolean {
        // TODO: validate product here

        // call this.addError(field, message) if has any error

        return true;
    }

    save(model: Product): boolean {
        return this.productService.saveProduct(model, this.isEditing);
    }
}