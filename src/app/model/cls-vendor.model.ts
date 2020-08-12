export class ClsVendor {
    vendor_id: number;
    vendor_name: string;
    address1: string;
    address2: string;
    vendor_code: string;
    city_id: number;
    city_name: string;
    state_id: number;
    state_name: string;
    country_id: number;
    country_name: string;
    zipcode: string;
    vendor_actv: boolean;

    constructor(vendor_id?: number, vendor_name?: string, address1?: string, address2?: string, vendor_code?: string, city_id?: number, city_name?: string, state_id?: number, state_name?: string, country_id?: number, country_name?: string, zipcode?: string, vendor_actv?: boolean) {
        this.vendor_id = vendor_id;
        this.vendor_name = vendor_name;
        this.address1 = address1;
        this.address2 = address2;
        this.vendor_code = vendor_code;
        this.city_id = city_id;
        this.city_name = city_name;
        this.state_id = state_id;
        this.state_name = state_name;
        this.country_id = country_id;
        this.country_name = country_name;
        this.zipcode = zipcode;
        this.vendor_actv = vendor_actv;
    }
}
