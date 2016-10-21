import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { BaseController } from '../shared/index';

@Component({
  selector: 'blank',
  templateUrl: 'src/app/blank/blank.html',
  styleUrls: ['src/app/blank/blank.css']
})

export class BlankCmp extends BaseController {
  constructor(
    router: Router,
    translate: TranslateService) {

      super(router, translate);
    }

    getCurrentUrl(): string {
      return '/blank';
    }
}
