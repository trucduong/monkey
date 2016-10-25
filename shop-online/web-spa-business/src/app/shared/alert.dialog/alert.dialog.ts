import {Component, Input, Output, EventEmitter} from '@angular/core';
import { AlertDialogInfo } from './alert.dialog.info';

@Component({
  selector:'alert-dialog-cmp',
  templateUrl:'src/app/shared/alert.dialog/alert.dialog.html',
  styleUrls: ['src/app/shared/alert.dialog/alert.dialog.css']
})
export class AlertDialogCmp {
  @Input('info') info: AlertDialogInfo;

  onAction(action: string) {
    this.info.isShow = false;
    if (this.info.listener) {
      this.info.listener.onExecute({action: action});
    }
  }
}