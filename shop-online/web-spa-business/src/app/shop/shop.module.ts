import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { ShopCmp } from './shop';
import { routing } from './shop.routing';
import { ShopService } from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ShopCmp
  ],
  providers: [
      ShopService
  ]
})
export class ShopModule {}
