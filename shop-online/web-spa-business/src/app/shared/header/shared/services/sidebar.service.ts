import { Injectable } from '@angular/core';
import { SidebarItem } from '../models/sidebar.item';

export const SIDEBARS: SidebarItem[] = [
  {href: '/blank', name:'sidebar.tongquan', isActive: true, icon: 'fa fa-dashboard fa-fw', childs: null},
  {href: '/blank', name:'sidebar.banhang', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/sell', name:'sidebar.bansy', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'sidebar.banle', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'sidebar.thuchi', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'sidebar.ketca', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'sidebar.khohang', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/warehouse-import', name:'sidebar.nhapmua', isActive: false, icon: null, childs: null},
      {href: '/warehouse-returns', name:'sidebar.nhaptra', isActive: false, icon: null, childs: null},
      {href: '/warehouse-export-returns', name:'sidebar.xuattra', isActive: false, icon: null, childs: null},
      {href: '/warehouse-transfer', name:'sidebar.dieuchuyen', isActive: false, icon: null, childs: null},
      {href: '/warehouse-detail', name:'sidebar.kiemke', isActive: false, icon: null, childs: null},
      {href: '/warehouse-status', name:'sidebar.warehouse.status', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'sidebar.doitac', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/supplier', name:'sidebar.nhacungcap', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'sidebar.baocao', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: null},
  {href: '/blank', name:'sidebar.thietlap', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/shop', name:'sidebar.cuahang', isActive: false, icon: null, childs: null},
      {href: '/warehouse', name:'sidebar.khohang', isActive: false, icon: null, childs: null},
      {href: '/product', name:'sidebar.sanpham', isActive: false, icon: null, childs: null}
  ]},
  {href: '/employee', name:'sidebar.nhanvien', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/employee', name:'sidebar.dsnhanvien', isActive: false, icon: null, childs: null},
      {href: '/account', name:'sidebar.dstaikhoan', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'Blank', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: null}
];

@Injectable()
export class SidebarService {
    // return siderbar item array
    getSidebar(): any {
        return SIDEBARS;
    }
}