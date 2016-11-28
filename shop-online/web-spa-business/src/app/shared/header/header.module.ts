import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { HttpModule, Http, JsonpModule }  from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { HeaderCmp }         from './header';
import { HeaderNotification }  from './notification/notification';
import { HeaderSearch } from './search/search';
import { HeaderSidebar } from './sidebar/sidebar';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
  ],
  declarations: [
    HeaderCmp,
    HeaderNotification,
    HeaderSearch,
    HeaderSidebar
  ],
  exports: [HeaderCmp]
})
export class HeaderModule { }