import {Injectable} from '@angular/core';
import { DialogInfo } from '../core/index';


@Injectable()
export class DialogService {
  show(dialog: DialogInfo) {
    dialog.isShow = true;
  }

  hide(dialog: DialogInfo) {
    dialog.isShow = false;
  }
}