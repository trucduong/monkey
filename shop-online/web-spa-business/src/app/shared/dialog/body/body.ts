import { Component, OnInit, Input } from '@angular/core';

import { DialogInfo } from '../dialog.info';

@Component({
    selector: 'dialog-body-cmp',
    templateUrl: 'src/app/shared/dialog/body/body.html'
})
export class DialogBodyCmp implements OnInit {
    @Input('info') info: DialogInfo;


    constructor() { }

    ngOnInit() { }
}