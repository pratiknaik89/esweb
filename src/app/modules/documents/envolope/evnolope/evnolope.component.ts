import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-evnolope',
  templateUrl: './evnolope.component.html',
  styleUrls: ['./evnolope.component.css']
})
export class EvnolopeComponent implements OnInit {
  items: any = [];
  showDocpannel: boolean = false;
  buttons = [];
  constructor() {
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Add Template In Evelope', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];


  }
  documentList: any = [];
  documentsDeatilList: any = [];
  envNo: any = '';
  selectedenvelope: any = {};
  envelopeList = [];
  ngOnInit(): void {



    for (let index = 0; index < 100; index++) {
      this.envelopeList.push({ id: index, name: "Envelope " + index });

    }

 
    this.documentsDeatilList = [
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    { id: 3, name: "Document 3", src: "" },
    { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    { id: 6, name: "Document 1", src: "/assets/img/img1.png" },];
    //   this.items = [
    //     {
    //         label: 'Documemnt 1',
    //         icon: 'pi pi-pw pi-file',
    //         command: (event) => {
    //           debugger
    //         }

    //     },
    //     {
    //       label: 'Documemnt 2',
    //       icon: 'pi pi-pw pi-file',

    //   },
    //   {
    //     label: 'Documemnt 3',
    //     icon: 'pi pi-pw pi-file',

    // }]
  }

  buttonClicks(id) {

    switch (id) {
      case "id": {

      }
    }
  }
  onColumnClick(item) {

    this.selectedenvelope = item;
  }
}
