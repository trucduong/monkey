import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ProductGroupCmp } from './group/group';
import { routing } from './product.routing';
import { ProductGroupDetailCmp } from './group/detail/detail';

import { ProductCmp } from './product';
import { ProductDetailCmp } from './detail/detail';
import { ProductPricesCmp } from './prices/prices';
import { ProductPricesDetailCmp } from './prices/detail/detail';


import {ProductService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProductGroupCmp,
    ProductGroupDetailCmp,
    ProductCmp,
    ProductDetailCmp,
    ProductPricesCmp,
    ProductPricesDetailCmp
  ],
  providers: [
      ProductService
  ]
})
export class ProductModule {}
