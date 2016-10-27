import { PaginationInfo } from '../pagination/pagination.info';

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
    sortable: boolean;
    width: number;
    translation: boolean;

    constructor(name: string, labelKey: string, sortable?: boolean, width?: number, translation?: boolean) {
        this.name = name;
        this.labelKey = labelKey;
        this.sortable = sortable;
        this.width = width;
        this.translation = translation ? true : false;
    }
}

export class GridInputHeader extends GridHeader {
    inputable: boolean;

    constructor(name: string, labelKey: string, sortable?: boolean, width?: number, translation?: boolean, inputable?: boolean) {
        super(name, labelKey, sortable, width, translation);
        this.inputable = inputable ? true : false;
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

// export class GridBean<T> {
//     id: string;
//     bean: T;
//     constructor(id?: string, bean?: T) {
//         this.id = id;
//         this.bean = bean;
//     }
// }

export class GridInfo {
    headers: GridHeader[];
    actions: GridAction[];
    filterInfo: FilterInfo;
    sortInfo: SortInfo;

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