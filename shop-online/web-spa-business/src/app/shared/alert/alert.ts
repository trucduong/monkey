import { Component, OnInit, Input } from '@angular/core';

import { AlertInfo } from './alert.info';

/**
 * AlertCmp
 * type: success, info, warning, danger
 */

@Component({
    selector: 'alert-cmp',
    templateUrl: 'src/app/shared/alert/alert.html'
})
export class AlertCmp implements OnInit {
    @Input('info') info: AlertInfo[];

    constructor() { }
    ngOnInit() {
    }
}