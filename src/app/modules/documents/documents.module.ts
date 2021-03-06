import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from '../documents/documents-routing.module';
import { from } from 'rxjs';
import { EditorComponent } from './editor/editor.component';
import { iEditorModule } from "esigndoccontrol";
//import { iEditorModule } from "/Users/pratiknaik/Work/i2t/DocEditor/idoceditor/dist/esigndoccontrol";
import { SharedModule } from '../../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    iEditorModule,
    SharedModule,
    AutoCompleteModule
  ]
})
export class DocumentsModule { }
