import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';
import { routing } from './warehouse.routing';

import { WarehouseCmp } from './warehouse';
import { WarehouseDetailCmp } from './detail/detail';
import { WarehouseImportCmp } from './import/import';


import {WarehouseService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    WarehouseCmp,
    WarehouseDetailCmp,
    WarehouseImportCmp
  ],
  providers: [
      WarehouseService
  ]
})
export class WarehouseModule {}
