import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import {TemplateRoutingModule} from '../templates/template-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { EdittemplateComponent } from './edittemplate/edittemplate.component';
import { FileUploadModule } from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import {RecipientModule} from '../../../shared/usercontrol/recipient/recipient.module';
import {DragDropModule} from 'primeng/dragdrop';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [AddComponent, ViewComponent, EdittemplateComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule,
    CardModule,
    FileUploadModule,
    RecipientModule,
    DragDropModule,
    DataViewModule 
    
  ]
})
export class TemplatesModule { }
