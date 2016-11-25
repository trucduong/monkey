import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ProductGroupCmp } from './group/group';
import { routing } from './product.routing';

import { ProductCmp } from './product';
import { ProductPricesCmp } from './prices/prices';


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
  ],
  providers: [
      ProductService
  ]
})
export class ProductModule {}
