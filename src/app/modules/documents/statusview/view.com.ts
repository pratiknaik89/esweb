import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { GlobalService } from '../../../service/global.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-doc-view',
    templateUrl: './view.com.html',
    styleUrls: ['./view.com.scss'],
    providers: [ConfirmationService]
})
export class DocStatusViewComponent implements OnInit {
    @ViewChild('template') popupContainer;
    modalRef: BsModalRef;
    buttons = [];
    section = 'all';
    sectionIcon = 'fa-circle'
    items: any[] = [];
    tempItems: TreeNode[] = [];
    downloadapi: string;
    totalRecords: number = 0;
    eventLogData: any[] = [];
    eventLogForTemplate: string;

    constructor(private status: StatusService, private global: GlobalService, private confirmmsg: ConfirmationService) {
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

    openModal() {
        this.modalRef = this.global.showPopup(this.popupContainer, { class: 'modal-xl' })
    }

    closeModal() {
        this.modalRef.hide();
    }

    ngOnInit(): void {
        this.downloadapi = this.global["config"].api_root + "/company(" + this.global.getCompany() + ")/document/getfinaldoc?filepath="
        this.getAllEnvLinkData();
    }

    searchString: any = '';
    searchData() {
        this.tempItems = this.filterData();
        this.totalRecords = this.tempItems.length;
    }

    onLeftClick(s, icon) {

        this.sectionIcon = icon;
        this.section = s;
        this.tempItems = this.filterData();
        this.totalRecords = this.tempItems.length;
    }

    buttonClicks(event) {

    }

    filterData() {
        let objData;
        switch (this.section) {
            case "all":
                objData = [...this.items];
                break;
            case "pending":
                objData = this.items.filter(a => a["data"]["status"] == "pending");
                break;
            case "completed":
                objData = this.items.filter(a => a["data"]["status"] == "completed");
                break;
            case "deleted":
                objData = this.items.filter(a => a["data"]["delete"] == true);
                break;
            case "canceled":
                objData = this.items.filter(a => (a["data"]["delete"] == true || a["data"]["active"] == false));
                break;
            default:
                break;
        }

        if (this.searchString.length > 0) {
            objData = objData.filter((a: any) => {
                let sub = a.data.name.toLowerCase();
                let search = this.searchString.toLowerCase();
                return sub.includes(search);
            });
        }

        return objData;
    }

    getEventLogByDrid(drid) {
        this.status.getEventLogBydrid({ "drid": drid }).subscribe((data: any) => {
            console.log(data);
            if (data.resultKey === 1) {
                for (let index = 0; index < data.resultValue.length; index++) {
                    data.resultValue[index].createdon = new Date(data.resultValue[index].createdon);
                }
                this.eventLogData = data.resultValue;
                this.eventLogForTemplate = "(" + this.eventLogData[0]["elname"] + ")";
                this.openModal()
            } else {
                //Error
                this.eventLogForTemplate = "";
            }
        });
    }

    sendSQSByDrid(dmid, drid) {
        this.confirmmsg.confirm({
            message: 'Do you want to send sqs?',
            header: 'SQS Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.status.sendSQSByDrid({ "dmid": dmid, "drid": drid, "userid": this.global.getUser().id }).subscribe((data: any) => {
                    console.log(data);
                    if (data.resultKey === 1) {

                    } else {
                        //Error

                    }
                });
            },
            reject: () => {

            }
        });
    }

    getAllEnvLinkData() {
        this.status.list({}).subscribe((data: any) => {
            if (data.resultKey === 1) {
                this.processGridData(data.resultValue);
            } else {
                //Error
            }
        });
    }

    onLazyLoad(event) {
        let objData = this.filterData();
        this.tempItems = objData.slice(event.first, event.first + event.rows);
        this.totalRecords = objData.length;
    }

    processGridData(objData) {
        if (objData.length == 0) {
            this.items = [];
        } else {
            this.items = objData.map(a => {
                return {
                    data: {
                        id: a.id,
                        name: a.name,
                        doc_no: a.doc_no,
                        com_no: a.com_no,
                        type: a.type,
                        status: (a.doc_no == a.com_no) ? "completed" : "pending",
                        active: a.active,
                        delete: a.delete,
                        lastupdated: new Date(a.lastupdated),
                        level: 1
                    },
                    children: [{ data: { col1: "", col2: "", col3: "", col4: "", col5: "" } }]
                };
            });
        }

        this.tempItems = [...this.items];
        this.totalRecords = this.tempItems.length;

        //          tblenvlink      tbldoclink      tblrecplink
        //          ----------      ----------      ----------
        // col1     name, 			subject, 		key
        // col2     doc_no,		    isorder			email
        // col3     com_no			finaldocurl		notifystatus
        // col4     status			status			status
        // col5     lastupdated	    lastupdated		lastupdated

    }

    onNodeExpand(event) {
        const node = event.node;
        if (event.node.parent == null) {
            //document tree node is expanded
            this.status.getDocLinkByEnvId({ dmid: event.node.data.id }).subscribe((data: any) => {
                if (data.resultKey === 1) {
                    let objData = data.resultValue.data.map(a => {
                        return {
                            data: {
                                id: a.id,
                                subject: a.subject,
                                isorder: a.isorder ? "Notify email in-order" : "Send email to all",
                                finaldocurl: a.finaldocurl,
                                status: a.status,
                                active: a.active,
                                delete: a.delete,
                                lastupdated: new Date(a.lastupdated),
                                dmid: data.resultValue.params.dmid,
                                level: 2
                            },
                            children: [{ data: { col1: "", col2: "", col3: "", col4: "", col5: "" } }]
                        }
                    });
                    node.children = objData;
                } else {
                    //Error
                }
                this.tempItems = [...this.tempItems];
            });
        } else {
            //recipient tree node is expanded
            this.status.getRecpLinkByEnvDocId({ dmid: event.node.data.dmid, drid: event.node.data.id }).subscribe((data: any) => {
                if (data.resultKey === 1) {
                    let objData = data.resultValue.data.map(a => {
                        return {
                            data: {
                                id: a.id,
                                key: a.key,
                                email: a.email,
                                notifystatus: (a.notifystatus == "pending") ? "Email pending" : "Mail send",
                                status: a.status,
                                active: a.active,
                                delete: a.delete,
                                lastupdated: new Date(a.lastupdated),
                                dmid: data.resultValue.params.dmid,
                                drid: data.resultValue.params.drid,
                                level: 3,
                                type: a.type
                            }
                        }
                    });
                    node.children = objData;
                } else {
                    //Error
                }
                this.tempItems = [...this.tempItems];
            });
        }
    }

    documentUrl(docurl) {
        return this.downloadapi + docurl;
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { Prerequisite } from '../../../service/prerequisite';
import { SharedModule } from '../../../shared/shared.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StatusService } from '../../../service/statusview.service';
import { TreeTableModule } from 'primeng/treetable';
import { identifierModuleUrl } from '@angular/compiler';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    imports: [CommonModule, SharedModule, ConfirmDialogModule, RouterModule.forChild(routes), SplitButtonModule, TreeTableModule],
    exports: [],
    providers: [],
})
export class DocStatusViewModule { }