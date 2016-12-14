import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseCmp } from './warehouse';
import { WarehouseImportCmp } from './import/import';
import { WarehouseHistoryCmp } from './history/history';
import { WarehouseDetailCmp } from './detail/detail';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'warehouse', component: WarehouseCmp },
  {path: 'warehouse-import', component: WarehouseImportCmp },
  {path: 'warehouse-history/:type', component: WarehouseHistoryCmp },
  {path: 'warehouse-detail', component: WarehouseDetailCmp },
]);
