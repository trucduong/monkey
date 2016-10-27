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
import { GridInputCmp } from './gridinput/grid.input';
import { GridActionCmp } from './grid/action/action';
import { GridContentCmp } from './grid/content/content';

import { FormCmp } from './form/form';
import { FormActionCmp } from './form/action/action';
import { FormContentCmp } from './form/content/content';
import { FormFieldCmp } from './form/field/field';

import { DialogCmp } from './dialog/dialog';
import { DialogHeaderCmp } from './dialog/header/header';
import { DialogBodyCmp } from './dialog/body/body';
import { DialogFooterCmp } from './dialog/footer/footer';
import { DialogService } from './dialog/dialog.service';

import { AlertDialogCmp } from './alert.dialog/alert.dialog';

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
    GridCmp, GridInputCmp, GridActionCmp, GridContentCmp,
    FormCmp, FormActionCmp, FormContentCmp, FormFieldCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp,
    AlertDialogCmp
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
    GridCmp, GridInputCmp, GridActionCmp, GridContentCmp,
    FormCmp, FormActionCmp, FormContentCmp, FormFieldCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp,
    AlertDialogCmp
  ],
  providers: [
      DialogService
  ]
})
export class SharedModule { }