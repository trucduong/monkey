import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ProductGroupCmp } from './group/group';
import { routing } from './product.routing';

import { ProductCmp } from './product';
import { ProductPricesCmp } from './prices/prices';
import { ProductPricesDetailCmp } from './prices/detail/detail';
import { ProductPricesUploadCmp } from './prices/upload/upload';


import {ProductService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProductGroupCmp,
    ProductCmp,
    ProductPricesCmp,
    ProductPricesDetailCmp,
    ProductPricesUploadCmp
  ],
  providers: [
      ProductService
  ]
})
export class ProductModule {}
