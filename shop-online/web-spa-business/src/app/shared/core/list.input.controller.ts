import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { GridInputHeader, GridAction, GridInfo, SortInfo, FilterInfo } from '../../shared/index';
import { BaseController } from './base.controller';
import { AlertType } from '../alert/alert.type';

/**
 * ListInputController
 */
export abstract class ListInputController<T> extends BaseController {
    constructor(
        private route: ActivatedRoute,
        translate: TranslateService,
        router: Router) {

        super(router, translate);
    }

    idColumnName = 'id';
    private gridInfo: GridInfo;
    dataSource: T[];
    private errors: { [key: string]: string; } = {};

    abstract getHeaders(): GridInputHeader[];
    abstract load(): Promise<T[]>;

    getActions(): GridAction[] {
        let actions: GridAction[] = [
            { name: 'delete', type: 'btn-danger', icon: 'fa fa-times' }
        ];
        return actions;
    }

    getDefaultSort(): SortInfo {
        return null;
    }

    getDefaultFilter(): FilterInfo {
        return new FilterInfo([]);
    }


    ngOnInit() {
        this.showLoading();

        this.errors = {};

        this.gridInfo = new GridInfo(this.getHeaders(), this.getActions(), this.getDefaultSort(), this.getDefaultFilter())
        this.onLoad();

        this.hideLoading();
    }

    onExecute(param: any) {
        if (!param.action) {
            return;
        }
        
        if (param.action == 'load') {
            this.onLoad();

        } else if (param.action == 'delete') {
            this.onDelete(param.data);

        } else {
            this.execute(param);
        }
    }
    
    execute(param: any) { }

    onDelete(item: T) {
        let mthis = this;
        mthis.showQuestionMessage({ key: 'common.alert.content.delete', params: [] }, {
            onExecute(event) {
                if (event.action == 'yes') {
                    // delete
                    mthis.dataSource = mthis.dataSource.filter(x => {
                        return x[mthis.idColumnName] != item[mthis.idColumnName];
                    });
                }
            }
        });
    }

    onLoad() {
        this.load()
            .then(data => {
                this.dataSource = data;
            })
            .catch(error => {
                this.dataSource = [];
            });
    }
}