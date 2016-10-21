import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-notification',
  templateUrl: 'src/app/shared/header/notification/notification.html'
})

export class HeaderNotification {
  constructor(private router: Router) { }

  toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  gotoPage(url: String): void {
    this.router.navigate([url]);
  }
}
