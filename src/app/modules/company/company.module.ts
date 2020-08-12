import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ViewComponent } from './view/view.component';
import { BannerComponent } from './banner/banner.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';

import { ListComponent } from './list/list.component';
import { LandingPageComponent } from './landingpage/landingpage.component';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [AddComponent, ProfileComponent, ViewComponent, BannerComponent,LandingPageComponent, ListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    DragDropModule,
    TabViewModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    CardModule,
    TooltipModule
  ]
})
export class CompanyModule { }
