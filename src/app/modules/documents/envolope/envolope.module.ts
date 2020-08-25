import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvnolopeComponent } from './evnolope/evnolope.component';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { SharedModule } from '../../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { EnvelopeRoutingModule } from '../../documents/envolope/evnolope/envelope-routing.module';
import { DocThumbModule } from '../../../shared/usercontrol/docthumb/docthumb.com';

// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: ''
//     },
//     children: [
//       {
//         path: '',
//         component:EvnolopeComponent ,
//         //canActivate: [Prerequisite],
//         data: {
//           title: '',
//           code: 'envolpe',


//         }
//       }
//     ]
//   }
// ];

@NgModule({
  declarations: [EvnolopeComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataViewModule,
    CardModule,
    FileUploadModule,
    EnvelopeRoutingModule,
    MenuModule,
    DocThumbModule

  ]
})


export class EnvolopeModule { }
