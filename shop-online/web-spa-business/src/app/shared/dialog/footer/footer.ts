import { Component, OnInit, Input } from '@angular/core';

import { DialogInfo } from '../dialog.info';

@Component({
    selector: 'dialog-footer-cmp',
    templateUrl: 'src/app/shared/dialog/footer/footer.html'
})
export class DialogFooterCmp implements OnInit {
    @Input('info') info: DialogInfo;


    constructor() { }

    ngOnInit() { }
}