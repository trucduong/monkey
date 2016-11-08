import { Component, OnChanges, SimpleChange,
    Input, Output, EventEmitter, ViewChild, Pipe, PipeTransform } from '@angular/core';

import { GridInfo, SortInfo, FilterInfo, GridHeader } from './grid.info';
import { PaginationInfo, ComboboxService } from '../index';
import { FilterCmp } from '../filter/filter';

@Component({
    selector: 'grid-cmp',
    templateUrl: 'src/app/shared/grid/grid.html',
    styleUrls: ['src/app/shared/grid/grid.css'],

})
export class GridCmp<T> implements OnChanges {
    @Input('info') info: GridInfo;
    @Input('data-source') dataSources: T[];

    @Output('onExecute') onExecute = new EventEmitter<any>();

    //@Output('onLoad') onLoad = new EventEmitter();
    //@Output('onEdit') onEdit = new EventEmitter<T>();
    //@Output('onDelete') onDelete = new EventEmitter<T>();

    selectedItem: T;
    items: T[];
    activeItems: T[];
    sortInfo: SortInfo;
    filterInfo: FilterInfo;
    paginationInfo: PaginationInfo;

    @ViewChild(FilterCmp)
    private filterCmp: FilterCmp;

    constructor() {
        if (!this.dataSources) {
            this.dataSources = [];
        }
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            this.sortInfo = new SortInfo(this.info.sortInfo.column, this.info.sortInfo.order);
            this.filterInfo = new FilterInfo(this.info.filterInfo.columns);
        }

        if (!this.dataSources) {
            this.dataSources = [];
        }

        this.filter();
    }

    filter(value?: string) {
        this.filterInfo.value = value;
        // filter data
        if (this.filterInfo.isEmpty()) {
            this.items = this.dataSources;
        } else {
            this.items = this.dataSources.filter(e => {
                let res = false;
                this.filterInfo.columns.every(c => {
                    if ((e[c] + '').indexOf(value) != -1) {
                        res = true;
                        return false;
                    }
                    return true;
                });
                return res;
            });
            // this.dataSources.forEach(item => {
            //     this.filterInfo.columns.every(c => {
            //         if (item[c].indexOf(value) != -1) {
            //             this.items.push(item);
            //             return false;
            //         }
            //     });
            // });
        }

        this.paginationInfo = new PaginationInfo(this.items.length);

        // clear sort
        this.sort();
    }

    sort(header?: GridHeader) {
        let column = null;
        let order = null;
        // sorrt default
        if (header) {
            if (!header.sortable) {
                return;
            } else {
                column = header.name;
                order = column == this.sortInfo.column ? (this.sortInfo.order == 'asc' ? 'desc' : 'asc') : 'asc';
            }
        } else { // sort default
            if (this.sortInfo.isEmpty()) {
                this.paging(1);
                return;
            } else {
                column = this.sortInfo.column;
                order = this.sortInfo.order;
            }
        }

        // update sort info
        if (column && order) {
            this.sortInfo = new SortInfo(column, order);
            let x = order == 'asc' ? 1 : -1;
            this.items = this.items.sort((a: T, b: T) => {
                if (a[column] > b[column]) {
                    return x;
                }

                if (a[column] < b[column]) {
                    return -x;
                }

                return 0;
            });
        }

        // pagination to 1
        this.paging(1);
    }

    paging(index: number) {
        if (index == 0) {
            this.filterCmp.clear();
            this.onExecute.emit({ action: 'load' });
        }

        this.paginationInfo.setCurrent(index);
        let start = (this.paginationInfo.current - 1) * this.paginationInfo.getMaxRow();
        let end = start + this.paginationInfo.getMaxRow();
        if (end > this.items.length) {
            end = this.items.length;
        }

        if (start < end) {
            this.activeItems = this.items.slice(start, end);
        } else {
            this.activeItems = [];
        }
    }

    execute(action: string, item: T) {
        if (action == 'select') {
            this.selectedItem = item;
        }

        this.onExecute.emit({ action: action, data: item });
    }

    getHeaderClass(header: GridHeader): string {
        let css = header.sortable ? 'sort-able ' : '';

        if (header.name == this.sortInfo.column) {
            css += 'sorting_' + this.sortInfo;
        }

        return css;
    }

    isRefText(labelKey: string) {
        if (labelKey.substr(0, 4) == 'ref.') {
            return true;
        }
        return false;
    }

    isCustomRefText(labelKey: string) {
        if (!this.info.translateServices) {
            return false;
        }

        let ser = this.info.translateServices.get(labelKey);
        if (ser) {
            return true;
        }

        return false;
    }

    isNormalText(labelKey: string) {
        return !this.isRefText(labelKey) && !this.isCustomRefText(labelKey);
    }
}

@Pipe({ name: 'cusTranslate', pure: false })
export class CustomTranslatePipe implements PipeTransform {
    private result: string;
    private oldValue: string;

    transform(value, service: ComboboxService) {
        if (value !== this.oldValue && !service.isLoading) {
            this.oldValue = value;
            this.result = '';
            service.getItems({}).then(res => {
                this.result = this.getTranslation(service, res, value);
            });
        }

        return this.result;
    }

    private getTranslation(service: ComboboxService, items: any[], value: any): string {
        let mthis = this;
        let res = '';
        items.forEach(item => {
            if (service.getValue(item) == value) {
                res = service.getLabel(item);
            }
        });

        return res;
    }
}
