import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Product, ProductService } from '../../shared/index';
import { BaseController, SERVICES } from '../../../shared/index';

const URL = SERVICES.URLS.resource + SERVICES.ACTIONS.UPLOAD_TEMP;

@Component({
    selector: 'product-prices-upload',
    templateUrl: 'src/app/product/prices/upload/upload.html',
})
export class ProductPricesUploadCmp extends BaseController implements OnInit {
    public uploader: FileUploader = new FileUploader({ url: URL });

    constructor(
        router: Router,
        translate: TranslateService,
        private productService: ProductService) {
        super(router, translate);
    }

    ngOnInit() {

    }

    getCurrentUrl(): string {
        return '/product-prices-upload';
    }
}