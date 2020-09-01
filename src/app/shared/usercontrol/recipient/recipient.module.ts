import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientComponent } from '../recipient/recipient.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipienRoutingModule } from '../recipient/recipient-routhing.module';
import { SharedModule } from '../../shared.module';
import { RecControlComponent } from './control/rec-control.comp';
import { EditorModule } from 'primeng/editor';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [RecipientComponent, RecControlComponent],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    RecipienRoutingModule,
    SharedModule,
    DragDropModule,
    EditorModule
  ],

})
export class RecipientModule { }
