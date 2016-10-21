import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { HeaderCmp }         from './header';
import { HeaderNotification }  from './notification/notification';
import { HeaderSearch } from './search/search';
import { HeaderSidebar } from './sidebar/sidebar';

@NgModule({
  imports:      [ 
    CommonModule
  ],
  declarations: [
    HeaderCmp,
    HeaderNotification,
    HeaderSearch,
    HeaderSidebar
  ],
  exports:      [ HeaderCmp ]
})
export class HeaderModule { }