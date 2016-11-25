import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { CustomerGroupCmp } from './group/group';
import { routing } from './customer.routing';
import { CustomerCmp } from './customer';
import {CustomerService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    CustomerGroupCmp,
    CustomerCmp,
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
