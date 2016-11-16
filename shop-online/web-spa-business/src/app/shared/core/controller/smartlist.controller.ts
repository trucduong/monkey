import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, BaseModel, GridColumn, GridAction, SmartGridInfo, SortInfo, FilterInfo, ComboboxService } from '../index';
import { AlertType } from '../../alert/alert.type';

/**
 * SmartListController
 */
export abstract class SmartListController<T extends BaseModel> extends BaseController {
    constructor(
        private route: ActivatedRoute,
        translate: TranslateService,
        router: Router) {

        super(router, translate);
    }

    private gridInfo: SmartGridInfo;
    private dataSource: T[];

    abstract load(): Promise<T[]>;
    abstract build(): SmartGridInfo;
    abstract save(model: T, isEditing: boolean): Promise<T>;


    getDefaultActions(): GridAction[] {
        return [];
    }

    getDefaultSort(): SortInfo {
        return null;
    }

    getDefaultFilter(): FilterInfo {
        return new FilterInfo([]);
    }

    getTranslateServices(): Map<string, ComboboxService> {
        return null;
    }

    createModel(): T {
        return null;
    }

    ngOnInit() {
        this.showLoading();

        let grid = this.build();
        grid.model = this.createModel();
        grid.translateServices = this.getTranslateServices();
        grid.columns.forEach(col => {
            col.fieldInfo.isSingle = true; // hide lable
        });
        this.gridInfo = grid;
        this.onLoad();

        this.hideLoading();
    }

    onExecute(param: any) {
        if (!param.action) {
            return;
        }

        if (param.action == 'load') {
            this.onLoad();

        } else if (param.action == 'add') {
            this.onSave(param, false);

        } else if (param.action == 'clear') {
            this.gridInfo.model = this.createModel();

        } else if (param.action == 'edit') {
            this.onSave(param, true);

        } else if (param.action == 'delete') {
            this.onDelete(param);

        } else if (param.action == 'select') {
            this.onSelect(param.data);

        } else {
            this.execute(param);
        }
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
    onSave(param: any, isEditing: boolean) {
        this.showLoading();

        // save
        this.save(param.data, isEditing)
            .then(item => {
                param.callback({data: item, newModel: this.createModel()});
                this.hideLoading();
            })
            .catch(error => {
                this.showErrorMessage({ key: "common.error.save", params: [] });
                this.log(error);
                this.hideLoading();
            });
    }
    onDelete(param: any) {
        let item = param.data;
        let mthis = this;
        // TODO: show confirm message
        mthis.showQuestionMessage({ key: 'common.alert.content.delete', params: [] }, {
            onExecute(event) {
                if (event.action == 'yes') {
                    // delete
                    mthis.delete(item)
                        .then(result => {
                            if (result) {
                                mthis.dataSource = mthis.dataSource.filter(e => {
                                    //return item.getId() != e.getId();
                                    return item['id'] != e['id']; // TODO: temp fix
                                });

                                mthis.alert(AlertType.success, 'common.alert.content.delete.success');
                            } else {
                                mthis.alert(AlertType.danger, 'common.alert.content.delete.failure');
                            }
                        })
                        .catch(error => {
                            mthis.alert(AlertType.danger, 'common.alert.content.delete.failure');
                        });
                }
            }
        });
    }

    onSelect(item: T) {
        //alert('select: ' + item[this.idColumnName]);
    }

    execute(param: any) { }

    delete(item: T): Promise<boolean> {
        return Promise.resolve(true);
    }
}