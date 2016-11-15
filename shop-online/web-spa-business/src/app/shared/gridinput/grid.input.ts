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

    // activeItems: T[];
    // sortInfo: SortInfo;
    // filterInfo: FilterInfo;
    // paginationInfo: PaginationInfo;

    constructor() { 
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        // if (changes['info']) {
        //     this.sortInfo = new SortInfo(this.info.sortInfo.column, this.info.sortInfo.order);
        //     this.filterInfo = new FilterInfo(this.info.filterInfo.columns);   
        // }

        if (!this.items) {
            this.items = [];
        }
        // this.paginationInfo = new PaginationInfo(this.items.length);
        // this.sort();
    }

    // sort(header?: GridHeader) {
    //     if (this.items.length == 0) {
    //         return;
    //     }

    //     let column = null;
    //     let order = null;
    //     // sorrt default
    //     if (header) {
    //         if (!header.sortable) {
    //             return;
    //         } else {
    //             column = header.name;
    //             order = column==this.sortInfo.column?(this.sortInfo.order=='asc'?'desc':'asc'):'asc';
    //         }
    //     } else { // sort default
    //         if (this.sortInfo.isEmpty()) {
    //             this.paging(1);
    //             return;
    //         } else {
    //             column = this.sortInfo.column;
    //             order = this.sortInfo.order;
    //         }
    //     }

    //     // update sort info
    //     if (column && order) {
    //         this.sortInfo = new SortInfo(column, order);
    //         let x = order=='asc'?1:-1;
    //         this.items = this.items.sort((a: T, b: T)=>{
    //             if (a[column] > b[column]) {
    //                 return x;
    //             }

    //             if (a[column] < b[column]) {
    //                 return -x;
    //             }
                
    //             return 0;
    //         });
    //     }

    //     // pagination to 1
    //     this.paging(1);
    // }

    // paging(index: number) {
    //     this.paginationInfo.setCurrent(index);
    //     let start = (this.paginationInfo.current - 1) * this.paginationInfo.getMaxRow();
    //     let end = start + this.paginationInfo.getMaxRow();
    //     if (end > this.items.length) {
    //         end = this.items.length;
    //     }

    //     if (start < end) {
    //         this.activeItems = this.items.slice(start, end);
    //     } else {
    //         this.activeItems = [];
    //     }
    // }

    execute(action: string, item: T) {
        this.onExecute.emit({action: action, data: item});
    }

    // getHeaderClass(header: GridHeader): string {
    //     let css = header.sortable?'sort-able ':'';

    //     if (header.name == this.sortInfo.column) {
    //         css += 'sorting_' + this.sortInfo;
    //     }
        
    //     return css;
    // }
}