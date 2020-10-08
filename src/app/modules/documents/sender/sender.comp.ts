import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../service/global.service';
@Component({
    selector: 'app-sender',
    templateUrl: './sender.comp.html',
    styleUrls: ['./sender.comp.scss']
})
export class SenderComponent implements OnInit {
    type = "temp";
    selectedTemplat: any = '';
    showPanel: boolean = false;
    envlopeName: any = '';
    abcs: any = '';
    iputType: any = "byid";
    response = "";
    temp_env_id = ""
    buttons = [];
    Fields = [];
    success: boolean = false;
    results: Array<string>;
    FieldLst = [];
    resultList: any = [];
    templetebyenvList: any = [];
    config: any = [];
    showAutocomplete: boolean = false;
    Recipients: any = [{
        "key": "",
        "name": "",
        "email": ""
    }];
    filePath: any = '';
    constructor(private sender: SenderService, private route: ActivatedRoute, private message: ToastService, private translate: TranslateService, private global: GlobalService) {

        let id = this.route.snapshot.params.id;
        let type = this.route.snapshot.params.type;
        this.sender.tempenvAutocomplete({
            'operate': 'searchtemplate_or_env',
            'type': 'directtosender',
            'id': id,
            "cmpid": this.global.getCompany(),
        }
        ).subscribe((data: any) => {
            if (data.resultKey == 1) {
                this.arrayForimge = data.resultValue;
                this.showPanel=true;
            }
        })

        if (id && type) {
            console.log(id, type)
            this.getPrefillData(id, type);
        }

    }

    getPrefillData(id, type) {
        this.iputType = 'byid';
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
        this.results = this.FieldLst.filter(a => a.toString().toLowerCase().indexOf(evt.query.toLowerCase()) != -1);
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

        this.config = this.global.getConfig();
        this.filePath = "https://" + this.config.AWS_BUCKET_PREFIX + "cmp" + this.global.getCompany() + ".s3.us-east-2.amazonaws.com/";
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
            this.showPanel=false;

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

    addAllFields() {
        this.Fields = []
        for (let i = 0; i < this.FieldLst.length; i++) {

            const element = this.FieldLst[i];
            this.Fields.push({
                "prop": element,
                "value": ""
            })
        }
        //this.Fields = this.results;
    }

    selectedField(e, item) {
        const isthere = this.Fields.filter(a => {
            return a.prop == e;
        })
        if (isthere && isthere.length > 1) {
            this.message.show("Duplicate", "Already in list", "warning", null)
            item.prop = "";
            item.value = "";
            return
        }

        console.log(e, item);

    }

    onRadioclick() {
        this.selectedTemplat = '';
        this.temp_env_id = '';
        this.Recipients = [{
            "key": "",
            "name": "",
            "email": ""
        }];
        this.arrayForimge=[];
        if (this.iputType == "byname") {
            this.showAutocomplete = true;

        } else {
            this.showAutocomplete = false;
        }

    }

    searchenvortemp(event) {

        this.sender.tempenvAutocomplete({
            'operate': 'searchtemplate_or_env',
            'type': this.type,
            'keyword': event.query,
            "cmpid": this.global.getCompany(),
        }).subscribe((res: any) => {
            if (res.resultKey === 1) {
                if (res.resultValue.length != 0) {
                    this.resultList = res.resultValue;
                } else {
                    this.message.show('Warning!', 'No record found!', 'warn', this.translate);
                    return;
                }


            }

        })

    }
    arrayForimge: any = [];
    selectedResult(event) {
        if (this.type == "temp") {
            this.arrayForimge.push(event);
            this.showPanel = true;
            this.temp_env_id = event.id;
            this.envlopeName = event.name;
            this.bindData(this.temp_env_id, this.type);
        } else {
            this.arrayForimge = [];
            this.showPanel = true;
            this.temp_env_id = event.id;
            this.envlopeName = event.name;
            this.bindData(this.temp_env_id, this.type);
            this.sender.tempenvAutocomplete({
                'operate': 'searchtemplate_or_env',
                'type': 'gettemplatebyenv',
                'envid': event.id,
                "cmpid": this.global.getCompany(),
            }).subscribe((res: any) => {
                if (res.resultKey === 1) {
                    if (res.resultValue.length != 0) {
                        this.arrayForimge = res.resultValue;
                    } else {
                        this.message.show('Warning!', 'No record found!', 'warn', this.translate);
                        return;
                    }


                }

            })
        }

    }
    onRadioclick1() {
        this.selectedTemplat = '';
        this.temp_env_id = '';
        this.Recipients = [{
            "key": "",
            "name": "",
            "email": ""
        }];
        this.arrayForimge=[];
    }
    urlHandle(srcurl) {

        return (srcurl == '' || srcurl != null || srcurl != undefined) ? (this.filePath + 'template/thumbnail/' + srcurl.split('/')[1].replace('.pdf', '.jpeg')) : null;

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