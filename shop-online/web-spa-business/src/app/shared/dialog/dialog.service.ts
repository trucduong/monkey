import {Injectable} from '@angular/core';
import { DialogInfo } from './dialog.info';


@Injectable()
export class DialogService {
  show(dialog: DialogInfo) {
    dialog.isShow = true;
  }

  hide(dialog: DialogInfo) {
    dialog.isShow = false;
  }
}