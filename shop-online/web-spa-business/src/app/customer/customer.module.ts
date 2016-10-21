import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { CustomerGroupCmp } from './group/group';
import { routing } from './customer.routing';
import { CustomerGroupDetailCmp } from './group/detail/detail';

import { CustomerCmp } from './customer';
import { CustomerDetailCmp } from './detail/detail';



import {CustomerService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    CustomerGroupCmp,
    CustomerGroupDetailCmp,
    CustomerCmp,
    CustomerDetailCmp
  ],
  providers: [
      CustomerService
  ]
})
export class CustomerModule {}
