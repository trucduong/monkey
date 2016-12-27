import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseModel, PaginationInfo, SmartGridInfo, SortInfo, FilterInfo, GridColumn } from '../index';

export abstract class BaseGridCmp<T extends BaseModel> {
    items: T[];
    activeItems: T[];
    sortInfo: SortInfo;
    filterInfo: FilterInfo;
    paginationInfo: PaginationInfo;

    isEditingMode: boolean;

    abstract getInfo(): SmartGridInfo;

    abstract getEventEmitter(): EventEmitter<any>;

    getDataSource(): T[] {
        return [];
    }

    clearFilter() {}

    filter(value?: string) {
        if (!this.filterInfo) {
            return;
        }

        this.filterInfo.value = value;
        // filter data
        if (this.filterInfo.isEmpty()) {
            this.items = this.getDataSource();
        } else {
            this.items = this.getDataSource().filter(e => {
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
        }

        this.paginationInfo = new PaginationInfo(this.items.length);

        // clear sort
        this.sort();
    }

    sort(header?: GridColumn) {
        if (!this.sortInfo) {
            return;
        }

        let column = null;
        let order = null;
        // sorrt default
        if (header) {
            if (!header.sortable) {
                return;
            } else {
                column = header.fieldInfo.name;
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
        if (!this.paginationInfo) {
            return;
        }

        if (index == 0) {
            this.clearFilter();
            this.getEventEmitter().emit({ action: 'load' });
            this.isEditingMode = false;
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

    getHeaderClass(header: GridColumn): string {
        let css = header.sortable ? 'sort-able ' : '';

        if (header.fieldInfo.name == this.sortInfo.column) {
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
        if (!this.getInfo().translateServices) {
            return false;
        }

        let ser = this.getInfo().translateServices.get(labelKey);
        if (ser) {
            return true;
        }

        return false;
    }

    isNormalRefText(fieldInfo) {
        if (!(fieldInfo['type'] == 'smartcombobox'
            || fieldInfo['type'] == 'combobox')) {
                return false;
        }

        return !this.isRefText(fieldInfo['label']) && !this.isCustomRefText(fieldInfo['label']);
    }

    isNormalText(labelKey: string) {
        return !this.isRefText(labelKey) && !this.isCustomRefText(labelKey);
    }

    isCustomFormatText(fieldInfo: any) {
        if (fieldInfo['type'] == 'date'
            || fieldInfo['type'] == 'datetime'
            || fieldInfo['type'] == 'time'
            || fieldInfo['type'] == 'number'
            || fieldInfo['type'] == 'smartcombobox'
            || fieldInfo['type'] == 'combobox') {
            return true;
        }

        return false;
    }

    validate(model: T) {
        let mthis = this;
        let isSuccess = true;
        mthis.getInfo().columns.forEach(col => {
            isSuccess = col.fieldInfo.validate(model[col.fieldInfo.name]) ? isSuccess : false;
        });

        return isSuccess;
    }

    clearError() {
        this.getInfo().columns.forEach(col => {
            col.fieldInfo.clearErrors();
        });
    }
}