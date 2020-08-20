import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipientComponent} from '../recipient/recipient.component';
import {CardModule} from 'primeng/card';
 
@NgModule({
  declarations: [RecipientComponent],
  imports: [
    CommonModule,
    CardModule,
  ]
})
export class RecipientModule { }
