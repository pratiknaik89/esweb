export class ClsTemplate {
    id: string;
    name: string;
    desc: string;
    tags: string[];
    recepienthead: string[];
    docurl: string;
    actv: boolean;

    constructor(id?: string, name: string = "", desc: string = "",
        tags: string[] = [], docurl: string = "",
        recepienthead: string[] = ["doctor", "patient", "hospital"],
        actv: boolean = true) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.tags = tags;
        this.docurl = docurl;
        this.recepienthead = recepienthead;
        this.actv = actv;
    }
}
