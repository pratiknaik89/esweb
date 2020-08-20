import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DocumentsRoutingModule} from '../documents/documents-routing.module';
import { from } from 'rxjs';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
