import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../../../shared/usercontrol/grid/grid.comp';
import { GlobalService } from '../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../service/toast-service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [DialogService]
})
export class ViewComponent implements OnInit {

  @ViewChild('grid') grid: GridComponent;
  cmpcode: any;

  constructor(private companyservice: CompanyService, private global: GlobalService, private translate: TranslateService, private message: ToastService, private route: Router, private dialogService: DialogService) {
    translate.use(global.getLang());
  }

  buttons = [];
  gridButtons = [];

  ngOnInit() {
    console.log('oninit');
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'info', 'text': 'Add', 'iconi': 'icon-plus', 'shortcut': 'ctrl+shift+a', 'access': true
      },
      {
        'id': 'filter', 'color': 'white', 'bg': 'primary', 'text': 'Advance Search', 'iconi': 'fa fa-search', 'shortcut': 'ctrl+shift+f', 'access': true
      }
    ];
    this.gridButtons = [{
      'id': 'edit', 'color': 'white', 'bg': 'info', 'text': 'Edit', 'iconi': 'fa fa-edit', 'btnstyle': this.global.btnStyle
    }, ];
    // {
    //   'id': 'editProfile', 'color': 'white', 'bg': 'success', 'text': 'Profile', 'iconi': 'fa fa-fort-awesome', 'btnstyle': this.global.btnStyle
    // }
    
  }

  buttonClicks(event) {
    console.log(event);
    //return false;
    let type = event[0].id;
    switch (type) {
      case 'edit':
        this.route.navigate(['/company/edit/' + event[1].id]);
        break;
      case 'editProfile':
        this.route.navigate(['/company/editProfile/' + event[1].id]);
        break;
      case 'filter':
        this.grid.advt.showModal()
        break;
      case 'add':
        this.route.navigate(['company/add']);
        break;
      case 'export':
        this.grid.export();
        break;
      default:
        break;
    }
  }
  edit(seletedItem) {
    this.route.navigate(['/company/edit/' + seletedItem[1].id]);
  }


}
