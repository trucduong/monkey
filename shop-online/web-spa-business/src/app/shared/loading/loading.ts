import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'loading-cmp',
    templateUrl: 'src/app/shared/loading/loading.html'
})
export class LoadingCmp implements OnInit {
    @Input('show') isShow: Boolean;
    constructor() { }

    ngOnInit() { }
}