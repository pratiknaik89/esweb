import { NumberValueAccessor } from '@angular/forms'

export class ClsUser {
    user_id: number;
    user_name: string;
    user_username: string;
    user_password: string;
    user_retype_password: string;
    role_id: number;
    role_name: string;
    account_id: any;
    account_name: any;
    user_isadmin: boolean;
    user_actv: boolean;

    constructor(user_id?: number, user_name?: string, user_username?: string, user_password?: string, user_retype_password?: string, role_id?: number, role_name?: string, account_id?: any,
        account_name?: any, user_isadmin?: boolean, user_actv?: boolean) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_username = user_username;
        this.user_password = user_password;
        this.user_retype_password = user_retype_password;
        this.role_id = role_id;
        this.role_name = role_name;
        this.account_id = account_id;
        this.account_name = account_name;
        this.user_isadmin = user_isadmin;
        this.user_actv = user_actv;
    }
}
