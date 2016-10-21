import { Component, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInfo } from './pagination.info';

/**
 * PaginationCmp
 * 0: refresh
 * 1,2,3...: page number
 */
@Component({
    selector: 'pagination-cmp',
    templateUrl: 'src/app/shared/pagination/pagination.html',
    styleUrls: ['src/app/shared/pagination/pagination.css']
})
export class PaginationCmp implements OnChanges {
    @Input('info') info: PaginationInfo;
    @Output('onPaging') onPaging = new EventEmitter<number>();

    pages: number[];

    constructor() { }
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if(this.info) {
            this.pages = [];
            for(let i = 1; i <= this.info.total; i++) {
                this.pages.push(i);
            }
        }
    }


    onSelectPage(index: number) {
        this.onPaging.emit(index);
    }

    next() {
        let index = this.info.current + 1;
        if (index > this.info.total) {
            index = this.info.total;
        }
        this.onSelectPage(index);
    }

    previous() {
        let index = this.info.current - 1;
        if (index < 1) {
            index = 1;
        }
        this.onSelectPage(index);
    }
}
