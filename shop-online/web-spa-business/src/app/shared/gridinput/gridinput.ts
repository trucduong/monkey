import { Component, OnChanges, SimpleChange, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseModel, SmartGridInfo, SortInfo, GridColumn, SmartCmbFieldInfo, BaseGridCmp, ValueChangeEvent } from '../index';

@Component({
    selector: 'gridinput-cmp',
    templateUrl: 'src/app/shared/gridinput/gridinput.html',
    styleUrls: ['src/app/shared/gridinput/gridinput.css'],

})
export class GridInputCmp<T extends BaseModel> extends BaseGridCmp<T> implements OnChanges, OnInit {
    @Input('info') info: SmartGridInfo;
    @Output('onExecute') onExecute = new EventEmitter<any>();
    searchField: SmartCmbFieldInfo;
    searchText: string;
    selectedItem: T;

    constructor(private translate: TranslateService) {
        super();
        this.items = [];
        this.searchText = '';
    }

    ngOnInit() {
        let mthis = this;
        mthis.searchField = new SmartCmbFieldInfo(mthis.translate, mthis.info.translateServices.get('filter.list'), 'searchText', '', false, true);
        mthis.searchField.addValueChangeListener({
            onChanged(event: ValueChangeEvent) {
                if (event.detail) {
                    let id = event.detail.value;
                    let product = mthis.items.filter(item => {
                        return item['id'] == id;
                    });

                    if (product.length == 0) {
                        mthis.execute('add', event.detail);
                    }
                }
            }
        });
    }

    getInfo() {
        return this.info;
    }

    getEventEmitter(): EventEmitter<any> {
        return this.onExecute;
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            this.sortInfo = new SortInfo(this.info.sortInfo.column, this.info.sortInfo.order);
        }
    }

    execute(action: string, data: any) {
        let mthis = this;
        if (action == 'select') {
            if (!this.info.option.selectable) {
                return;
            }
            mthis.selectedItem = data;
        }
        if (action == 'save') {
            if (!mthis.validate(data)) {
                return;
            }
        } else if (action == 'saveAll') {
            mthis.clearError();
            let success = true;
            mthis.items.forEach(e => {
                success = success && mthis.validate(e);
            });
            if (!success) {
                return;
            }

        } else if (action == 'delete') {
            mthis.clearError();
            mthis.delete(data);
        }

        mthis.onExecute.emit({
            action: action, data: data, callBack: res => {
                if (res.action == 'add') {
                    mthis.items.push(res.data);
                } else if (res.action == 'clear') {
                    mthis.items = [];
                }
            }
        });

    }

    delete(item: T) {
        let mthis = this;
        mthis.items = mthis.items.filter(p => {
            return item['id'] != p['id'];
        });
    }

}
