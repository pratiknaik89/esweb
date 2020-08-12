import { Injectable } from '@angular/core';
import { Helper } from './../helper';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: "root" })
export class ToastService {
    helper: Helper
    constructor(private message: ToastrService) {
        this.helper = new Helper();
    }
    public showTranslate(title, message, type, translate) {
        let msg = this.helper.translate(translate, message);


        if (msg === undefined) {
            msg = message;
        }

        if (type === 'success') {
            this.message.success(msg, this.helper.translate(translate, title))
        } else if (type === 'error') {
            this.message.error(msg, this.helper.translate(translate, title))
        }
        else if (type === 'info') {
            this.message.info(msg, this.helper.translate(translate, title))
        }

    }

    public show(title, message, type, translate) {
        if (type === 'success') {
            this.message.success(message,  title)
        } else if (type === 'error') {
            console.log(message);
            this.message.error(message,   title)
        }
        else if (type === 'areaex') {
            this.message.error(message,   title)
        }
    }

}