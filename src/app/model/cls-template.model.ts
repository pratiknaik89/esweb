import { ClsRecipientType } from './cls-recipient-model';

export class ClsTemplate {
    id: string;
    name: string;
    desc: string;
    tags: string[];
    recipienthead: Array<object>;
    docurl: string;
    dataref: object;
    actv: boolean;

    constructor(id?: string, name: string = "", desc: string = "",
        tags: string[] = [], docurl: string = "",
        recipienthead: Array<object> = [{ id: "Doctor", rectype: "1" }, { id: "Patient", rectype: "2" }],
        actv: boolean = true) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.tags = tags;
        this.docurl = docurl;
        this.recipienthead = recipienthead;
        this.actv = actv;
    }
}
