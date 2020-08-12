import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../../../../shared/usercontrol/grid/grid.comp';
import { AddComponent } from '../../../../modules/usermaster/user/add/add.component';
import { GlobalService } from '../../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('form') form: AddComponent;
  constructor(private global: GlobalService,private translate: TranslateService,) {   translate.use('en');}
  buttons = [];
  isfav = false;
  gridStyle: any = [];
  userType:any='';
  ngOnInit() {
    
    this.userType =this.global.getUser().usertype;
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'info', 'text': 'Add', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    this.gridButtons = [{
      'id': 'edit', 'color': 'white', 'bg': 'info', 'text': 'Edit', 'iconi': 'fa fa-edit', 'btnstyle': this.global.btnStyle
    }];
  }
  gridButtons: any = []
  buttonClicks(id) {

    switch (id) {
      case 'add':
        this.form.open('add', {}, () => {
          this.grid.RefreshGrid();
        });
        break;
      case 'fav':
        this.buttons[0].disabled = true;
        this.isfav = !this.isfav;
        break;
      default:
        break;
    }
  }
  add() {

  }
  edit(seletedItem) {
    
    // this.route.navigate(['/brand/add/' + seletedItem]);

    this.form.open('edit', seletedItem[1], () => {
      
      this.grid.RefreshGrid();
    });
  }
}
