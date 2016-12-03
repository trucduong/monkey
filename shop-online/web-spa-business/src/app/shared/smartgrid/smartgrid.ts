import { Component, OnChanges, SimpleChange,
    Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { BaseModel, PaginationInfo, SortInfo, FilterInfo, BaseGridCmp, SmartGridInfo } from '../index';
import { FilterCmp } from '../filter/filter';

@Component({
    selector: 'smartgrid-cmp',
    templateUrl: 'src/app/shared/smartgrid/smartgrid.html',
    styleUrls: ['src/app/shared/smartgrid/smartgrid.css'],

})
export class SmartGridCmp<T extends BaseModel> extends BaseGridCmp<T> implements OnChanges {
    @Input('info') info: SmartGridInfo;
    @Output('onExecute') onExecute = new EventEmitter<any>();
    @Input('data-source') dataSources: T[];

    selectedItem: T;

    @ViewChild(FilterCmp)
    private filterCmp: FilterCmp;

    constructor() {
        super();
        if (!this.dataSources) {
            this.dataSources = [];
        }
    }

    getInfo() {
        return this.info;
    }

    getEventEmitter(): EventEmitter<any> {
        return this.onExecute;
    }
    
    getDataSource(): T[] {
        return this.dataSources;
    }

    clearFilter() {
        if (this.filterCmp) {
            this.filterCmp.clear();
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

    execute(action: string, item: T) {
        if (action == 'select') {
            if (!this.info.option.selectable) {
                return;
            }
            this.selectedItem = item;

        } else if (action == 'add') {
            if (!this.validate(item)) {
                // this.goToFristError();
                return;
            }

        } else if (action == 'edit') {
            this.isEditingMode = true;
            item.isDirty = true;
            // this.goToFristColumn();
            return;

        } else if (action == 'cancel') {
            this.isEditingMode = false;
            item.isDirty = false;
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
            action: action, data: item, callBack: res => {
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

                // this.goToFristColumn();
            }
        });

    }
}
