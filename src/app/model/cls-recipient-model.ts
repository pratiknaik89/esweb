export class ClsTRecipientDtl {
    templateid: string;
    subject: string;
    emailbody: string;
    keeporder: boolean;
    recipienthead: Array<ClsRecipient>;

    constructor(templateid: string = "", subject: string = "", emailbody: string = "",
        keeporder: boolean = false, recipienthead: Array<ClsRecipient> = []) {
        this.templateid = templateid;
        this.subject = subject;
        this.emailbody = emailbody;
        this.keeporder = keeporder;
        this.recipienthead = recipienthead;
    }
}

export class ClsRecipient {
    id: string;
    rectype: string;

    constructor(id: string = "", rectype: string = "") {
        this.id = id;
        this.rectype = rectype;
    }
}

export class ClsRecipientType {
    id: string;
    desc: string;

    constructor(id: string = "", desc: string = "") {
        this.id = id;
        this.desc = desc;
    }
}



