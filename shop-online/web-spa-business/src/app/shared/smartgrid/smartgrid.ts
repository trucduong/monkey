import { Component, OnChanges, SimpleChange,
    Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { BaseModel, PaginationInfo, ComboboxService, SmartGridInfo, SortInfo, FilterInfo, GridColumn } from '../index';
import { FilterCmp } from '../filter/filter';

@Component({
    selector: 'smartgrid-cmp',
    templateUrl: 'src/app/shared/smartgrid/smartgrid.html',
    styleUrls: ['src/app/shared/smartgrid/smartgrid.css'],

})
export class SmartGridCmp<T extends BaseModel> implements OnChanges {
    @Input('info') info: SmartGridInfo;
    @Input('data-source') dataSources: T[];

    @Output('onExecute') onExecute = new EventEmitter<any>();

    selectedItem: T;
    items: T[];
    activeItems: T[];
    sortInfo: SortInfo;
    filterInfo: FilterInfo;
    paginationInfo: PaginationInfo;
    isEditingMode: boolean;

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
        }

        this.paginationInfo = new PaginationInfo(this.items.length);

        // clear sort
        this.sort();
    }

    sort(header?: GridColumn) {
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
        if (index == 0) {
            this.filterCmp.clear();
            this.onExecute.emit({ action: 'load' });
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

    execute(action: string, item: T) {
        if (action == 'select') {
            if (!this.info.option.selectable) {
                return;
            }
            this.selectedItem = item;

        } else if (action == 'add') {
            if (!this.validate(item)) {
                this.goToFristError();
                return;
            }

        } else if (action == 'edit') {
            this.isEditingMode = true;
            item.isDirty = true;
            this.goToFristColumn();
            return;

        } else if (action == 'save') {
            if (!this.validate(item)) {
                return;
            }
            action = 'edit';
        } else if (action == 'clear') {
            this.clearError();
        }

        this.onExecute.emit({
            action: action, data: item, callback: res => {
                if (action == 'add') {
                    this.dataSources.push(res.data);
                    this.info.model = res.newModel;
                    this.paginationInfo = new PaginationInfo(this.dataSources.length);
                    this.paging(this.paginationInfo.total);
                } else if (action == 'edit') {
                    // update all new attribute
                    item.isDirty = false;
                    item['version'] = res.data['version'];
                    this.isEditingMode = false;
                }

                this.goToFristColumn();
            }
        });

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

    validate(model: T) {
        let mthis = this;
        let isSuccess = true;
        mthis.info.columns.forEach(col => {
            isSuccess = col.fieldInfo.validate(model[col.fieldInfo.name]) ? isSuccess : false;
        });

        return isSuccess;
    }

    clearError() {
        this.info.columns.forEach(col => {
            col.fieldInfo.clearErrors();
        });
    }

    goToFristColumn() {
        this.setFocus(this.info.columns[0]);
    }

    goToFristError() {
        for (let index = 0; index < this.info.columns.length; index++) {
            if (this.info.columns[index].fieldInfo.hasError()) {
                this.setFocus(this.info.columns[0]);
                return;
            }
        }
        
        this.goToFristColumn();
    }

    setFocus(column: GridColumn) {
        column.fieldInfo.autofocus=true;
    }
}
