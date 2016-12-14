import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';
import { routing } from './warehouse.routing';

import { WarehouseCmp } from './warehouse';
import { WarehouseImportCmp } from './import/import';
import { WarehouseHistoryCmp } from './history/history';
import { WarehouseDetailCmp } from './detail/detail';


import {WarehouseService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    WarehouseCmp,
    WarehouseImportCmp,
    WarehouseHistoryCmp,
    WarehouseDetailCmp
  ],
  providers: [
      WarehouseService
  ]
})
export class WarehouseModule {}
