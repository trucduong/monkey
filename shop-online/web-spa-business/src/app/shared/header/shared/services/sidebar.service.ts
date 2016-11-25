import { Injectable } from '@angular/core';
import { SidebarItem } from '../models/sidebar.item';

export const SIDEBARS: SidebarItem[] = [
  {href: '/blank', name:'Tong Quan', isActive: true, icon: 'fa fa-dashboard fa-fw', childs: null},
  {href: '/blank', name:'Ban Hang', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: null},
  {href: '/blank', name:'Kho Hang', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/warehouse-import', name:'Nhap mua', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Nhap tra hang', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Xuat tra hang', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Dieu chuyen', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Kiem ke', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'Tien', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/blank', name:'Thu chi', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Ket ca', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Dieu chinh tien trong ket', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'Doi tac', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/customer', name:'Khach hang', isActive: false, icon: null, childs: null},
      {href: '/supplier', name:'Nha cung cap', isActive: false, icon: null, childs: null}
  ]},
  {href: '/blank', name:'Bao cao', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: null},
  {href: '/blank', name:'Thiet lap', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/shop', name:'Cua hang', isActive: false, icon: null, childs: null},
      {href: '/warehouse', name:'Kho hang', isActive: false, icon: null, childs: null},
      {href: '/product', name:'San pham', isActive: false, icon: null, childs: null}
  ]},
  {href: '/employee', name:'Nhan Vien', isActive: false, icon: 'fa fa-dashboard fa-fw', childs: [
      {href: '/employee', name:'Danh sach nhan vien', isActive: false, icon: null, childs: null},
      {href: '/blank', name:'Danh sach tai khoan', isActive: false, icon: null, childs: null}
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