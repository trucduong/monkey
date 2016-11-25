import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseCmp } from './warehouse';
import { WarehouseImportCmp } from './import/import';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'warehouse', component: WarehouseCmp },
  {path: 'warehouse-import', component: WarehouseImportCmp }
]);
