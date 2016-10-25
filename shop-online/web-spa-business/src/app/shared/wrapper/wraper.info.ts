/**
 * WrapperInfo
 */
import { AlertDialogInfo } from '../index';

export class WrapperInfo {
    isLoading: boolean;
    dialog: AlertDialogInfo;

    constructor(isLoading?: boolean, dialog?: AlertDialogInfo) {
        this.isLoading = isLoading;
        this.dialog = dialog;
    }
}