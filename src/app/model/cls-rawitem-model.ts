export class ClsRawItem {
    id: number;
    _desc: string;
    class_id: number;
    class_name: string;
    category_id: number;
    category_name: string;
    quality_id: number;
    quality_name: string;
    iscountonly: boolean;
    actv: boolean;

    constructor(id?: number, _desc?: string, class_id?: number, class_name?: string,
        category_id?: number, category_name?: string, quality_id?: number, quality_name?: string,
        iscountonly?: boolean, actv?: boolean) {
        this.id = id;
        this._desc = _desc;
        this.class_id = class_id;
        this.class_name = class_name;
        this.category_id = category_id;
        this.category_name = category_name;
        this.quality_id = quality_id;
        this.quality_name = quality_name;
        this.iscountonly = iscountonly;
        this.actv = actv;
    }
}

export class ClsRawItemDtl {
    id: number;
    barcode: string;
    code: string;
    emptyweight: number;
    ewuom: number;
    fullweight: number;
    fwuom: number;
    type_id: number;
    size: number;
    uom_id: number;
    density: number;
    rawitemid: number;
    actv: boolean;

    constructor(id?: number, barcode?: string, code?: string, emptyweight?: number, ewuom?: number,
        fullweight?: number, fwuom?: number, type_id?: number, size?: number, uom_id?: number,
        density?: number, rawitemid?: number, actv?: boolean) {
        this.id = id;
        this.barcode = barcode;
        this.code = code;
        this.emptyweight = emptyweight;
        this.ewuom = ewuom;
        this.fullweight = fullweight;
        this.fwuom = fwuom;
        this.type_id = type_id;
        this.size = size;
        this.uom_id = uom_id;
        this.density = density;
        this.rawitemid = rawitemid;
        this.actv = actv;
    }
}