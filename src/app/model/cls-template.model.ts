import { ClsRecipientType } from './cls-recipient-model';

export class ClsTemplate {
    id: string;
    name: string;
    desc: string;
    tags: string[];
    recipienthead: ClsRecipientType[];
    docurl: string;
    dataref: object;
    actv: boolean;

    constructor(id?: string, name: string = "", desc: string = "",
        tags: string[] = [], docurl: string = "",
        recipienthead: ClsRecipientType[] = [new ClsRecipientType("1", "Signer"), new ClsRecipientType("2", "Receive Carbon Copy")],
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
