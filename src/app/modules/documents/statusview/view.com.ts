import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-doc-view',
    templateUrl: './view.com.html',
    styleUrls: ['./view.com.scss']
})
export class DocStatusViewComponent implements OnInit {
    buttons = [];
    section = 'all';
    items = [];
    tempItems = [];

    constructor(private status: StatusService) {
        this.buttons = [
            // {
            //     'id': 'edit', 'color': 'white', 'bg': 'primary', 'text': 'Edit Envelope', 'icon': 'pencil', 'shortcut': 'ctrl+shift+a',
            //     'disabled': true, 'access': true
            // },
            // {
            //     'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Add Templates In Evelope', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
            //     'disabled': false, 'access': true
            // }
        ];
    }

    ngOnInit(): void {
        this.getAllEnvLinkData();
    }

    searchString: any = '';
    searchData() {
        if (this.searchString.length == 0) {
            this.items = this.tempItems;
        }

        let tempResults = this.tempItems.filter((a) => {
            let sub = a.subject.toLowerCase();
            let search = this.searchString.toLowerCase();
            return sub.includes(search);
        });

        if (tempResults != undefined) {
            this.items = [];
            tempResults.forEach(element => {
                this.items.push(element);
            });
        }
    }
    onLeftClick(s) {
        this.section = s;
        this.showSections(s);
    }
    buttonClicks(event) {

    }
    showSections(status) {
        switch (status) {
            case "all":
                this.tempItems = [...this.items];
                break;
            case "pending":
                break;
            case "deleted":
                break;
            case "canceled":
                break;
            default:
                break;
        }
    }

    getAllEnvLinkData() {
        this.status.list({}).subscribe((data: any) => {
            if (data.resultKey === 1) {
                this.items = data.resultValue[0];
                this.showSections('all');
            } else {
                //Error
            }
        });
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { Prerequisite } from '../../../service/prerequisite';
import { SharedModule } from '../../../shared/shared.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StatusService } from '../../../service/statusview.service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Documents'
                },
                children: [
                    {
                        path: '',
                        component: DocStatusViewComponent,
                        data: {
                            title: 'Staus View',
                            code: 'statusview',
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
    declarations: [DocStatusViewComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes), SplitButtonModule],
    exports: [],
    providers: [],
})
export class DocStatusViewModule { }