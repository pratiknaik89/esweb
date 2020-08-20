import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DocumentsRoutingModule} from '../documents/documents-routing.module';
import { from } from 'rxjs';
import { EditorComponent } from './editor/editor.component';
import { iEditorModule } from "esigndoccontrol";

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    iEditorModule
  ]
})
export class DocumentsModule { }
