import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-doc-view',
    templateUrl: './view.com.html',
    styleUrls: ['./view.com.scss']
})
export class DocStatusViewComponent implements OnInit {
    showLoader = false
    buttons = [];
    section = 'all';
    items = [];
    itemss = [
        {
            'color': 'warning',
            'icon': 'warning',
            'status': 'Pending',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'success',
            'icon': 'check',
            'status': 'Completed',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'warning',
            'icon': 'warning',
            'status': 'Pending',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'info',
            'icon': 'send',
            'status': 'Sent',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'warning',
            'icon': 'warning',
            'status': 'Pending',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'success',
            'icon': 'check',
            'status': 'Completed',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        },
        {
            'color': 'primary',
            'icon': 'pencil',
            'status': 'Draft',
            'subject': 'This is Subject title',
            'to': 'pratik@ideas2ech.com',
            'last_changed': '2020-01-01 11:20 AM'
        }
    ]
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
    onLeftClick(s) {
        this.section = s;
        this.showSections(s);
    }
    buttonClicks(event) {

    }
    showSections(status) {
        this.status.list({}).subscribe((data: any) => {
            if (data.resultKey === 1) {
                this.items = data.resultValue[0];
                this.showLoader = false;
            } else {
                this.showLoader = false;
            }
        })

        // if (status != 'all') {
        //     this.items = this.itemss.filter(a => {
        //         return a.status.toLowerCase() == status
        //     })
        // } else {
        //     this.items = this.itemss;
        // }

    }

    ngOnInit(): void {
        this.showSections('all');

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