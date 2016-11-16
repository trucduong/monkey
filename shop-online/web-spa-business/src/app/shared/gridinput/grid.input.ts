import { Component, OnChanges, SimpleChange, 
    Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { PaginationInfo, GridInfo, SortInfo, FilterInfo, GridHeader } from '../core/index';
import {  } from '../index';
import { FilterCmp } from '../filter/filter';

@Component({
    selector: 'grid-input-cmp',
    templateUrl: 'src/app/shared/gridinput/grid.input.html',
    styleUrls: ['src/app/shared/gridinput/grid.input.css']
})
export class GridInputCmp<T> implements OnChanges {
    @Input('info') info: GridInfo;
    @Input('data-source') items: T[];
    @Output('onExecute') onExecute = new EventEmitter<any>();

    constructor() { 
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (!this.items) {
            this.items = [];
        }
    }

    execute(action: string, item: T) {
        this.onExecute.emit({action: action, data: item});
    }
}