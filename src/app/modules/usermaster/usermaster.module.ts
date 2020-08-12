import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { SharedModule } from './../../shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UsermasterRoutingModule } from '../usermaster/usrmaster-routing.module';
import { GetuserService } from '../../service/getuser-service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
//import { AutoCompleteModule, FileUploadModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AddComponent } from './user/add/add.component';
import { ViewComponent } from './user/view/view.component';
// import { ReviewndaComponent } from './reviewnda/reviewnda.component';


@NgModule({
  imports: [
    CommonModule, SharedModule,
    UsermasterRoutingModule, TableModule, FormsModule, DropdownModule, CheckboxModule, AutoCompleteModule,ScrollPanelModule],
  declarations: [RoleComponent, AddComponent, ViewComponent],
  providers: [GetuserService]
})
export class UsermasterModule { }
