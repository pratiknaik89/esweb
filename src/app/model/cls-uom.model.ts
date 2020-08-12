export class ClsUOM {
    id: number;
    _desc: string;
    multiplier: number;
    actv: boolean;

    constructor(id?: number, _desc?: string, multiplier?: number, actv?: boolean) {
        this.id = id;
        this._desc = _desc;
        this.multiplier = multiplier;
        this.actv = actv;
    }
}
