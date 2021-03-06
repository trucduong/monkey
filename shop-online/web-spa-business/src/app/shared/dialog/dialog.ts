import {Component, Input} from '@angular/core';
import { DialogInfo } from '../core/index';

@Component({
  selector:'dialog-cmp',
  templateUrl:'src/app/shared/dialog/dialog.html',
  styleUrls: ['src/app/shared/dialog/dialog.css']
})
export class DialogCmp {
  @Input('info') info: DialogInfo;

}