export class ClsShelfLinkup {
    shelflinkup_id: number;
    shelflinkup_name: string;
    account_id: number;
    //account_name: string;
    location_id: number;
    //location_name: string;
    section_id: number;
    //section_name: string;
    shelf_id: number;
    //shelf_name: string;

    constructor(shelflinkup_id?: number, shelflinkup_name?: string, account_id?: number,
        location_id?: number, section_id?: number, shelf_id?: number) {
        this.shelflinkup_id = shelflinkup_id;
        this.shelflinkup_name = shelflinkup_name;
        this.account_id = account_id;
        this.location_id = location_id;
        this.section_id = section_id;
        this.shelf_id = shelf_id;
    }
}
