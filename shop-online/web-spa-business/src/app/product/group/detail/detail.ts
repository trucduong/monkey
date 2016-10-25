import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ProductService, ProductGroup } from '../../shared/index';
import { AlertType } from '../../../shared/index';
import { EditController } from '../../../shared/index';

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

    createModel(): ProductGroup {
        return new ProductGroup();
    }

    // load(id: any): ProductGroup {
    //     return this.productService.getProductGroup(id);
    // }

    validate(model: ProductGroup): boolean {
        // TODO: validate product group here

        // call this.addError(field, message) if has any error

        return true;
    }

    // save(model: ProductGroup): boolean {
    //     return this.productService.saveProductGroup(model, this.isEditing);
    // }
}