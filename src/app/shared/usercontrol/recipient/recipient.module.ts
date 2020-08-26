import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientComponent } from '../recipient/recipient.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipienRoutingModule } from '../recipient/recipient-routhing.module';
import { SharedModule } from '../../shared.module';
import { RecControlComponent } from './control/rec-control.comp';
@NgModule({
  declarations: [RecipientComponent, RecControlComponent],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    RecipienRoutingModule,
    SharedModule

  ],

})
export class RecipientModule { }
