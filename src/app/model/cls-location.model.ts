export class ClsLocation {
    location_id: number;
    location_name: string;
    account_id: number;
    account_name: string;
    location_isstore: boolean;
    location_actv: boolean;


    constructor(location_id?: number, location_name?: string, account_id?: number, account_name?: string,
        location_isstore?: boolean, location_act?: boolean) {
        this.location_id = location_id;
        this.location_name = location_name;
        this.account_id = account_id;
        this.account_name = account_name;
        this.location_isstore = location_isstore;
        this.location_actv = location_act;
    }
}
