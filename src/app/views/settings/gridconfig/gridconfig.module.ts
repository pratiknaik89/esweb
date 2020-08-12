import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import{GridConfigRoutingModule} from '../gridconfig/gridconfig-routing.module'
import {GridconfigComponent} from '../gridconfig/gridconfig.component';
import { PanelModule } from 'primeng/panel';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [GridconfigComponent],
  imports: [
    CommonModule,
    GridConfigRoutingModule,
    SharedModule,
    PanelModule,
    DragDropModule
  ]
})
export class GridconfigModule { }
