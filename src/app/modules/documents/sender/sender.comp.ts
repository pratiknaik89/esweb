import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-sender',
    templateUrl: './sender.comp.html',
    styleUrls: ['./sender.comp.scss']
})
export class SenderComponent implements OnInit {
    type = "temp";
    response = "";
    temp_env_id = ""
    buttons = [];
    Fields = [];
    success: boolean = false;
    results: Array<string>;
    FieldLst = [];

    Recipients: any = [{
        "key": "",
        "name": "",
        "email": ""
    }];
    constructor(private sender: SenderService, private route: ActivatedRoute, private message: ToastService, private translate: TranslateService,) {

        let id = this.route.snapshot.params.id;
        let type = this.route.snapshot.params.type;

        if (id && type) {
            console.log(id, type)
            this.getPrefillData(id, type);
        }

    }

    getPrefillData(id, type) {
        this.temp_env_id = id;
        if (type === 'e') {
            this.type = "env"
        } else if (type === 'd') {
            this.type = "temp"
        }
        var data = {
            "type": type,
            "id": id

        }

        this.sender.prefillData(data).subscribe(d => {
            this.Recipients = d.resultValue.recipienthead.map(a => {
                return {
                    "key": a,
                    "name": "",
                    "email": ""
                }
            });
            this.FieldLst = d.resultValue.fields;

        }, (er) => {

        })
    }

    search(evt) {
        this.results = this.FieldLst.filter(a => a.toString().indexOf(evt.query) != -1);
    }

    buttonClicks(e) {
        this.sendData();
    }
    onAddRecipeint(e) {

        this.Recipients.push({
            "key": "",
            "name": "",
            "email": ""
        })


    }

    checkRecipients() {
        let res;
        const unique = [...new Set(this.Recipients.map(item => item.key))];
        const uniqueEmail = [...new Set(this.Recipients.map(item => item.email))];
        if (unique.length != this.Recipients.length) {
            res = false;
            this.message.show('error', "Duplicate Key", 'error', this.translate);
            return;
        }
        else if (uniqueEmail.length != this.Recipients.length) {
            res = false;
            this.message.show('error', "Duplicate Email", 'error', this.translate);
            return;
        }

        else if (unique.indexOf("") != -1) {
            res = false;
            this.message.show('error', "Fill the data", 'error', this.translate);
            return;
        } else {
            res = true;
        }
        return res;
    }

    onAddProperty(a) {
        this.Fields.push({
            "prop": "",
            "value": ""
        })
    }

    onRemoveProperty(e, i) {
        this.Fields.splice(i, 1);
    }

    onRemove(e, i) {

        this.Recipients.splice(i, 1);
    }

    ngOnInit(): void {
        this.buttons = [
            {
                'id': 'send', 'color': 'white', 'bg': 'danger', 'text': 'Send', 'icon': ' fa fa-send', 'shortcut': 'ctrl+shift+a',
                'disabled': false, 'access': true
            }

        ];
    }


    getRecipeients() {
        let rec = {};
        for (let i = 0; i < this.Recipients.length; i++) {
            const element = this.Recipients[i];
            rec[element.key] = {
                name: element.name,
                email: element.email,
                note: ''
            }
        }
        return rec;
    }

    getFields() {
        let field = {};
        for (let i = 0; i < this.Fields.length; i++) {
            const element = this.Fields[i];
            field[element.prop] = {
                value: element.value
            }
        }
        return field;
    }

    sendData() {
        let flag;
        flag = this.checkRecipients();
        if (!flag) {
            return;
        }
        var data = {
            "operate": "create",
            "data": {
                "recipient": this.getRecipeients(),
                "fields_map": this.getFields()
            },
            "userid": "5f74d3fa-06ac-11ea-9cac-6fc0c2648c68"
        }

        if (this.type == 'temp') {
            data.data['templateid'] = this.temp_env_id;
        } else {
            data.data['envelopeid'] = this.temp_env_id;
        }

        this.sender.sendData(data).subscribe(d => {
            console.log(d)
            this.response = d;
            this.success = true;

        }, (er) => {
            this.success = false;
            this.response = er;
        })
    }

    bindData(id, type) {
        var data = {
            "type": type == "temp" ? "d" : "e",
            "id": id
        }

        this.sender.prefillData(data).subscribe(d => {
            this.Recipients = d.resultValue.recipienthead.map(a => {
                return {
                    "key": a,
                    "name": "",
                    "email": ""
                }
            });
            this.FieldLst = d.resultValue.fields;
        }, (er) => {

        })
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Prerequisite } from '../../../service/prerequisite';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SenderService } from '../../../service/sender.service';
import { ToastService } from '../../../service/toast-service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Sender'
                },
                children: [
                    {
                        path: '',
                        component: SenderComponent,
                        data: {
                            title: 'Send',
                            code: 'sender',
                            //    role: 'di'
                        },
                        canActivate: [Prerequisite],
                    },
                    {
                        path: ':type/:id',
                        component: SenderComponent,
                        data: {
                            title: 'Send',
                            code: 'sender',
                            //    role: 'di'
                        },
                        canActivate: [Prerequisite],
                    }




                ]
            }
        ]
    }
];

@NgModule({
    declarations: [SenderComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes), CardModule, RadioButtonModule],
    exports: [],
    providers: [SenderService],
})
export class SenderModule { }