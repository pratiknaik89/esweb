import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from '../documents/documents-routing.module';
import { from } from 'rxjs';
import { EditorComponent } from './editor/editor.component';
import { iEditorModule } from "esigndoccontrol";
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    iEditorModule,
    SharedModule
  ]
})
export class DocumentsModule { }
