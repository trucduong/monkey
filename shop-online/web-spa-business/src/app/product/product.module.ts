import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ProductGroupCmp } from './group/group';
import { routing } from './product.routing';
import { ProductGroupDetailCmp } from './group/detail/detail';

import { ProductCmp } from './product';
import { ProductDetailCmp } from './detail/detail';

import { UnitCmp } from './unit/unit';
import { UnitDetailCmp } from './unit/detail/detail';



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
    UnitCmp ,
    UnitDetailCmp
  ],
  providers: [
      ProductService
  ]
})
export class ProductModule {}
