import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DialogInfo } from '../dialog.info';

@Component({
    selector: 'dialog-header-cmp',
    templateUrl: 'src/app/shared/dialog/header/header.html'
})
export class DialogHeaderCmp implements OnInit {
    @Input('info') info: DialogInfo;
    @Output('onClose') onClose: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    close() {
        this.onClose.emit();
    }
}