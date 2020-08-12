import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalService } from '../../../service/global.service';
import {GridComponent} from '../../../shared/usercontrol/grid/grid.comp';
import { AddComponent} from '../add/add.component';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  buttons = [];
  gridButtons=[];
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('form') form: AddComponent;
  isfav = false;
  constructor(private global: GlobalService) { }

  ngOnInit(): void {

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

  edit(seletedItem) {
    
    // this.route.navigate(['/brand/add/' + seletedItem]);

    this.form.open('edit', seletedItem[1], () => {
      
      this.grid.RefreshGrid();
    });
  }
}
