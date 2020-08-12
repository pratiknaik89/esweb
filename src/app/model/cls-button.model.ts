export class ClsButton {
    type: string;
    value: string;
    icon: string;
    disabled?: boolean = false;
    visible?: boolean = true;
    click?: any;

    constructor(type?: string, value?: string, click?: any) {
        this.type = type;
        this.value = value;
        this.click = click;
    }
}
