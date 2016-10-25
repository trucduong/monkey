export interface DialogListener {
    onExecute(event: any);
}

export class DialogButton {
    name: string;
    title: string;
    type: string;
    constructor(name: string, title: string, type: string) {
        this.name = name;
        this.title = title;
        this.type = type;
    }
}

export const DIALOG_ACTIONS = {
    YES: {name:'yes', type:'btn-primary', title:'common.dialog.btn.yes'},
    NO: {name:'no', type:'btn-default', title:'common.dialog.btn.no'},
    OK: {name:'ok', type:'btn-primary', title:'common.dialog.btn.ok'},
    CANCEL: {name:'cancel', type:'btn-default', title:'common.dialog.btn.cancel'},
    CONFIRM: {name:'confirm', type:'btn-primary', title:'common.dialog.btn.confirm'},
    CLOSE: {name:'close', type:'btn-default', title:'common.dialog.btn.close'},
};

export class AlertDialogInfo {
    isShow: boolean;
    title: string;
    content: string;
    actions: DialogButton[];
    listener: DialogListener;

    constructor(title: string, content: string, actions: DialogButton[], listener?: DialogListener) {
        this.listener = listener;
        this.isShow = false;
        this.title = title;
        this.content = content;
        this.actions = actions;
    }

    getDisplayStyle(): string {
        return this.isShow ? 'block' : 'none';
    }
}