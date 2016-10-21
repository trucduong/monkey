import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseCmp } from './warehouse';
import { WarehouseDetailCmp} from './detail/detail';
import { WarehouseImportCmp } from './import/import';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'warehouse', component: WarehouseCmp },
  {path: 'warehouse-detail/:id', component: WarehouseDetailCmp },
  {path: 'warehouse-import', component: WarehouseImportCmp },
]);
