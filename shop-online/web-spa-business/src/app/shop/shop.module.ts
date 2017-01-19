import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ShopCmp } from './shop';
import { routing } from './shop.routing';
import { ShopService, OrderService } from './shared/index';

import { SellCmp } from './sell/sell';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ShopCmp,
    SellCmp
  ],
  providers: [
      ShopService,
      OrderService
  ]
})
export class ShopModule {}
