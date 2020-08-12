export class ClsAccountMaster {
    account_id: number;
    account_name: string;
    audittype_id: number;
    audittype_name: string;
    address1: string;
    address2: string;
    account_code: string;
    city_id: number;
    city_name: string;
    state_id: number;
    state_name: string;
    country_id: number;
    country_name: string;
    zipcode: string;
    active: boolean;

    constructor(account_id?: number, account_name?: string, audittype_id?: number, audittype_name?: string, address1?: string, address2?: string, account_code?: string, city_id?: number, city_name?: string, state_id?: number, state_name?: string, country_id?: number, country_name?: string, zipcode?: string, acive?: boolean) {
        this.account_id = account_id;
        this.account_name = account_name;
        this.audittype_id = audittype_id;
        this.audittype_name = audittype_name;
        this.address1 = address1;
        this.address2 = address2;
        this.account_code = account_code;
        this.city_id = city_id;
        this.city_name = city_name;
        this.state_id = state_id;
        this.state_name = state_name;
        this.country_id = country_id;
        this.country_name = country_name;
        this.zipcode = zipcode;
        this.active = acive;
    }
}
