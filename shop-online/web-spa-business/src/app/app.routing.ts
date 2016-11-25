import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blank', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'blank', loadChildren: 'app/blank/blank.module#BlankModule' },
  { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule' },
  { path: 'employee', loadChildren: 'app/employee/employee.module#EmployeeModule' },
  { path: 'supplier', loadChildren: 'app/supplier/supplier.module#SupplierModule' },
  { path: 'product', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'warehouse', loadChildren: 'app/warehouse/warehouse.module#WarehouseModule' },
  { path: 'shop', loadChildren: 'app/shop/shop.module#ShopModule' }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
