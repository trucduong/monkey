import { BaseModel } from '../../../shared/index';

export class UserAccount extends BaseModel {
    id: string;
    loginName: string;
    accountType: string;
    status: string;
    permissions: string;
    employeeId: string;
    
    constructor(){
        super();
    }
}