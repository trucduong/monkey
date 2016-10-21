import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filter-cmp',
    templateUrl: 'src/app/shared/filter/filter.html'
})
export class FilterCmp implements OnInit {
    @Output('onFilter') onFilter = new EventEmitter<string>();
    filterText: string;
    constructor() { }
    ngOnInit() { }
    clear() {
        this.filterText = '';
    }
    onKey() {
        this.onFilter.emit(this.filterText);
    }
}
