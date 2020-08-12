export class ClsSalesImport {
    menuItem: string;
    description: string;
    quantity: any;
    unitprice: any;
    totalamount: any;
    isblacklist: boolean;


    constructor(menuItem?: string, description?: string, quantity?: any, unitprice?: any, totalamount?: any, isblacklist?: boolean) {
        this.menuItem = menuItem;
        this.description = description;
        this.quantity = quantity;
        this.unitprice = unitprice;
        this.totalamount = totalamount;
        this.isblacklist = isblacklist;
    }
}
