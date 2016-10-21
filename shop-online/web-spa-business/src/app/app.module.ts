import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app';
import { appRouting } from './app.routing';

import { AuthModule } from './auth/index';
import { BlankModule } from './blank/index';
import { CustomerModule } from './customer/index';
import { SupplierModule } from './supplier/index';
import { ProductModule } from './product/index';
import { WarehouseModule } from './warehouse/index';




@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    appRouting,
    AuthModule,
    BlankModule,
    CustomerModule,
    SupplierModule,
    ProductModule,
    WarehouseModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}