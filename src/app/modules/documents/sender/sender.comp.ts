

import { Component, OnInit } from '@angular/core';

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
    success : boolean =false;

    Recipients = [{
        "key": "",
        "name": "",
        "email": ""
    }];
    constructor(private sender: SenderService) {


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

        var data = {
            "operate": "create",
            "data": {
                "recepient": this.getRecipeients(),
                "fields_map": this.getFields()
            },
            "userid": "5f74d3fa-06ac-11ea-9cac-6fc0c2648c68"
        }

        if (this.type == 'temp') {
            data.data['tmplateid'] = this.temp_env_id;
        } else {
            data.data['envelopeid'] = this.temp_env_id;
        }

        this.sender.sendData(data).subscribe(d => {
            console.log(d)
            this.response = d;
            this.success= true;

        }, (er) => {
            this.success= false;
            this.response = er;
        })
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { Prerequisite } from '../../../service/prerequisite';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SenderService } from '../../../service/sender.service';

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