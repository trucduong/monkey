import { PaginationInfo } from './pagination.info';
import { ComboboxService } from '../service/combobox.service';
import { FormFieldInfo } from './form.info';

export class SortInfo {
    column: string;
    order: string;
    constructor(col?: string, ord?: string) {
        this.column = col;
        this.order = ord;
    }

    isEmpty() {
        if (this.column) {
            return false;
        }

        return true;
    }

    clear() {
        this.column = null;
        this.order = null;
    }
}

export class FilterInfo {
    columns: string[];
    value: string;
    constructor(columns: string[]) {
        this.columns = columns;
    }

    isEmpty() {
        if (!this.columns || this.columns.length == 0
            || !this.value || this.value.length == 0) {

            return true;
        }

        return false;
    }

    clear() {
        this.value = null;
    }

    hasInfo() {
        if (this.columns && this.columns.length > 0) {
            return true;
        }

        return false;
    }
}

export class GridHeader {
    name: string;
    labelKey: string;
    width: number;
    sortable: boolean;

    constructor(name: string, labelKey: string, sortable?: boolean, width?: number) {
        this.name = name;
        this.labelKey = labelKey;
        this.sortable = sortable;
        this.width = width;
    }
}

export class GridInputHeader extends GridHeader {
    inputable: boolean;

    constructor(name: string, labelKey: string, sortable?: boolean, width?: number, inputable?: boolean) {
        super(name, labelKey, sortable, width);
        this.inputable = inputable ? true : false;
    }
}


export class GridInfo {
    headers: GridHeader[];
    actions: GridAction[];
    filterInfo: FilterInfo;
    sortInfo: SortInfo;
    translateServices: Map<string, ComboboxService>;

    constructor(headers: GridHeader[],
        actions: GridAction[],
        sortInfo?: SortInfo,
        filterInfo?: FilterInfo) {

        this.headers = headers;
        this.actions = actions;
        this.filterInfo = filterInfo;
        this.sortInfo = sortInfo;
    }

    hasFilterInfo() {
        return this.filterInfo && !this.filterInfo.isEmpty();
    }
}

export class GridAction {
    name: string;
    icon: string;
    type: string;
    constructor(name: string, icon: string, type: string) {
        this.name = name;
        this.icon = icon;
        this.type = type;
    }
}

export class GridColumn {
    editable: boolean; // Can edit in gid (inline)
    width: number;
    sortable: boolean;
    fieldInfo: FormFieldInfo;

    constructor(fieldInfo: FormFieldInfo, width: number, sortable: boolean, editable: boolean) {
        this.fieldInfo = fieldInfo;
        this.sortable = sortable;
        this.width = width;
        this.editable = editable;
    }
}

export class GridOption {
    addable: boolean;
    editable: boolean;
    deleteable: boolean;
    selectable: boolean

    constructor(selectable: boolean, addable: boolean, editable: boolean, deleteable: boolean) {
        this.selectable = selectable;
        this.addable = addable;
        this.editable = editable;
        this.deleteable = deleteable;
    }
}

export class GridValueChangeEvent {
    field: any;
    oldValue: any;
    newValue: any;
    src: any;

    constructor(field: any, oldValue: any, newValue: any, src?: any) {
        this.field = field;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.src = src;
    }
}

export interface GridValueChangeListener {
    onChanged(obj: any);
}

export class SmartGridInfo {
    option: GridOption;
    columns: GridColumn[];
    actions: GridAction[];
    filterInfo: FilterInfo;
    sortInfo: SortInfo;
    model: any;
    translateServices: Map<string, ComboboxService>;

    private valuechangelisteners: GridValueChangeListener[];

    constructor(option: GridOption,
        columns: GridColumn[],
        actions: GridAction[],
        sortInfo?: SortInfo,
        filterInfo?: FilterInfo) {

        this.valuechangelisteners = [];

        this.option = option;
        this.columns = columns;
        this.actions = actions;
        this.filterInfo = filterInfo;
        this.sortInfo = sortInfo;

        // regis value change
        this.regisValueChange();
    }

    private regisValueChange() {
        let mthis = this;
        if (!mthis.columns) {
            return;
        }

        mthis.columns.forEach(col => {
            col.fieldInfo.addValueChangeListener({
                onChanged(event) {
                    mthis.fireValueChangeListener({field: col.fieldInfo.name, oldValue: event.oldValue, newValue: event.newValue, src: event.detail});
                }
            })
        });
    }

    hasFilterInfo() {
        return this.filterInfo && !this.filterInfo.isEmpty();
    }

    addValueChangeListener(listener: GridValueChangeListener) {
        this.valuechangelisteners.push(listener);
    }

    fireValueChangeListener(event: GridValueChangeEvent) {
        this.valuechangelisteners.forEach(listener => {
            listener.onChanged(event);
        });
    }

    // public validate(obj: any): boolean {
    //     let mthis = this;
    //     this.clearErrors();

    //     // validate fields
    //     this.fields.forEach(field => {
    //         field.validate(this.model[field.name]);
    //     });

    //     // validate form
    //     if (this.getValidators().length > 0) {
    //         this.getValidators().forEach(validator => {
    //             let err = validator.validate(mthis.model);
    //             if (err) {
    //                 mthis.addError(err);
    //             }
    //         });
    //     }

    //     this.translateErrors(this.getErrors());
    //     return !this.hasError();
    // }
}