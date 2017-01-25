import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseCmp } from './warehouse';
import { WarehouseImportCmp } from './import/import';
import { WarehouseHistoryCmp } from './history/history';
import { WarehouseDetailCmp } from './detail/detail';
import { WarehouseReturnCmp } from './returns/returns';
import { WarehouseExportReturnCmp } from './export/export';
import { WarehouseTransferCmp } from './transfer/transfer';
import { WarehouseStatusCmp } from './status/status';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'warehouse', component: WarehouseCmp },
  {path: 'warehouse-import', component: WarehouseImportCmp },
  {path: 'warehouse-history/:type', component: WarehouseHistoryCmp },
  {path: 'warehouse-detail', component: WarehouseDetailCmp },
  {path: 'warehouse-returns', component: WarehouseReturnCmp },
  {path: 'warehouse-export-returns', component: WarehouseExportReturnCmp },
  {path: 'warehouse-transfer', component: WarehouseTransferCmp },
  {path: 'warehouse-status', component: WarehouseStatusCmp }
]);
