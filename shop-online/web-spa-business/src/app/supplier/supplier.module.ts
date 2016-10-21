import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { SupplierGroupCmp } from './group/group';
import { routing } from './supplier.routing';
import { SupplierGroupDetailCmp } from './group/detail/detail';

import { SupplierCmp } from './supplier';
import { SupplierDetailCmp } from './detail/detail';



import {SupplierService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    SupplierGroupCmp,
    SupplierGroupDetailCmp,
    SupplierCmp,
    SupplierDetailCmp
  ],
  providers: [
      SupplierService
  ]
})
export class SupplierModule {}
