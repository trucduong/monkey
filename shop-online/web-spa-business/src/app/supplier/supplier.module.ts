import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { SupplierGroupCmp } from './group/group';
import { routing } from './supplier.routing';

import { SupplierCmp } from './supplier';

import {SupplierService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    SupplierGroupCmp,
    SupplierCmp,
  ],
  providers: [
      SupplierService
  ]
})
export class SupplierModule {}
