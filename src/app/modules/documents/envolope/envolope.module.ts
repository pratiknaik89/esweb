import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvnolopeComponent } from './evnolope/evnolope.component';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { SharedModule } from '../../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import {EnvelopeRoutingModule} from '../../documents/envolope/evnolope/envelope-routing.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CheckboxModule} from 'primeng/checkbox';
import { DocThumbModule } from '../../../shared/usercontrol/docthumb/docthumb.com';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {SafePipe} from '../../../pipes/SafePipe.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
  declarations: [EvnolopeComponent,SafePipe],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
 
    SharedModule,
    DataViewModule,
    CardModule,
    FileUploadModule,
    EnvelopeRoutingModule,
    MenuModule,
    DocThumbModule,
    CheckboxModule,
    PdfViewerModule,
    ConfirmDialogModule

  ]
})


export class EnvolopeModule { }
