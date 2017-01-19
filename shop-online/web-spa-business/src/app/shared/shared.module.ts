import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, JsonpModule }  from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { HeaderModule } from './header/index';
import { FilterCmp }  from './filter/filter';
import { PaginationCmp }  from './pagination/pagination';
import { WrapperCmp }  from './wrapper/wrapper';
import { AlertCmp } from './alert/alert';
import { LoadingCmp } from './loading/loading';
import { CustomTranslatePipe, CustomNumberPipe, LocalStorageService } from './core/index';
import { GridCmp } from './grid/grid';
import { SmartGridCmp } from './smartgrid/smartgrid';
import { GridInputCmp } from './gridinput/gridinput';
import { GridActionCmp } from './grid/action/action';
import { GridContentCmp } from './grid/content/content';

import { FormCmp } from './form/form';
import { FormActionCmp } from './form/action/action';
import { FormContentCmp } from './form/content/content';
import { FormFieldCmp, TextFieldCmp, TextAreaFieldCmp, NumberFieldCmp, DateFieldCmp, 
  CheckboxFieldCmp, RadioFieldCmp, CmbFieldCmp, SmartCmbFieldCmp } from './form/field/field';

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
    FileSelectDirective,
    CustomTranslatePipe,
    CustomNumberPipe,
    FilterCmp,
    PaginationCmp,
    WrapperCmp,
    AlertCmp,
    LoadingCmp,
    GridCmp, SmartGridCmp, GridInputCmp, GridActionCmp, GridContentCmp,
    FormCmp, FormActionCmp, FormContentCmp, FormFieldCmp,
    TextFieldCmp, TextAreaFieldCmp, NumberFieldCmp, DateFieldCmp, CheckboxFieldCmp, RadioFieldCmp, CmbFieldCmp, SmartCmbFieldCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp,
    AlertDialogCmp
  ],
  exports: [ 
    CommonModule,
    FormsModule,
    HttpModule, JsonpModule,
    TranslateModule,
    FileSelectDirective,
    HeaderModule,
    FilterCmp,
    PaginationCmp,
    WrapperCmp,
    AlertCmp,
    LoadingCmp,
    GridCmp, SmartGridCmp, GridInputCmp, GridActionCmp, GridContentCmp,
    FormCmp, FormActionCmp, FormContentCmp, FormFieldCmp,
    TextFieldCmp, TextAreaFieldCmp, NumberFieldCmp, DateFieldCmp, CheckboxFieldCmp, RadioFieldCmp, CmbFieldCmp, SmartCmbFieldCmp,
    DialogCmp, DialogHeaderCmp, DialogBodyCmp, DialogFooterCmp,
    AlertDialogCmp,CustomNumberPipe
  ],
  providers: [
      DialogService,
      LocalStorageService
  ]
})
export class SharedModule { }