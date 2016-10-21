import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { BlankCmp } from './blank';
import { routing } from './blank.routing';
import { BlankService } from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    BlankCmp
  ],
  providers: [
      BlankService
  ]
})
export class BlankModule {}
