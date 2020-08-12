export class ClsCommonField {
    id: number;
    _desc: string;
    actv: boolean;

    constructor(id?: number, _desc?: string, actv?: boolean) {
        this.id = id;
        this._desc = _desc;
        this.actv = actv;
    }
}
