import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, JsonpModule }  from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { HeaderModule } from './header/index';
import { FilterCmp }  from './filter/filter';
import { PaginationCmp }  from './pagination/pagination';
import { WrapperCmp }  from './wrapper/wrapper';
import { AlertCmp } from './alert/alert';
import { LoadingCmp } from './loading/loading';
import { GridCmp } from './grid/grid';
import { GridActionCmp } from './grid/action/action';
import { GridContentCmp } from './grid/content/content';

import { DialogCmp } from './dialog/dialog';
import { DialogHeaderCmp } from './dialog/header/header';
import { DialogBodyCmp } from './dialog/body/body';
import { DialogFooterCmp } from './dialog/footer/footer';
import { DialogService } from './dialog/dialog.service';

@NgModule({
  imports:      [ 
    CommonModule,
    FormsModule,
    HttpModule, JsonpModule,
    TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
          deps: [Http]
        }),
    HeaderModule
  ],
  declarations: [
    FilterCmp,
    PaginationCmp,
    WrapperCmp,
    AlertCmp,
    LoadingCmp,
    GridCmp, GridActionCmp, GridContentCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp
  ],
  exports: [ 
    CommonModule,
    FormsModule,
    HttpModule, JsonpModule,
    TranslateModule,
    HeaderModule,
    FilterCmp,
    PaginationCmp,
    WrapperCmp,
    AlertCmp,
    LoadingCmp,
    GridCmp, GridActionCmp, GridContentCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp
  ],
  providers: [
      DialogService
  ]
})
export class SharedModule { }