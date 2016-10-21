import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService, SidebarItem } from '../shared/index';

@Component({
  selector: 'header-sidebar',
  templateUrl: 'src/app/shared/header/sidebar/sidebar.html',
  providers: [SidebarService]
})

export class HeaderSidebar implements OnInit {
  sidebars: SidebarItem[];
  selectedItem: SidebarItem;

  constructor(
    private router: Router,
    private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebars = this.sidebarService.getSidebar();
    //this.onSelect(this.sidebars[0]);
  }

  gotoPage(url: String): void {
    console.log(event)
    this.router.navigate([url]);
  }

  onSelect(item: SidebarItem): void {
    this.selectedItem = item;

    // Set selected item
    if (item.childs != null && item.childs.length > 0) {
      item.isActive = !item.isActive;
    } else {
      item.isActive = true;
      this.router.navigate([item.href]);
    }

    // clear other selected state
    this.sidebars.forEach(element => {
      if (element != item) {
        element.isActive = false;
        if (element.childs != null && element.childs.length > 0) {
          element.childs.forEach(child => {
              if (child == item) {
                element.isActive = true;
              } else {
                child.isActive = false;
              }
          });
        }
      }
    });
  }
}
