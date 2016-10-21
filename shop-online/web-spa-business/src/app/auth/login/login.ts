import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: 'src/app/auth/login/login.html',
  styleUrls: ['src/app/auth/login/login.css']
})
export class LoginCmp {
  constructor(
    private router: Router) { }

  gotoBlank(): void {
    this.router.navigate(['/blank']);
  }
}
