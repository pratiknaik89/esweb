import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prerequisite } from '../../service/prerequisite';


import { from } from 'rxjs';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: ''
        },
        children: [
          {
            path: 'view',
            loadChildren: () => import('./statusview/view.com').then(m => m.DocStatusViewModule),


          },
          {
            path: 'envolope',
            loadChildren: () => import('./envolope/envolope.module').then(m => m.EnvolopeModule),


          },
          {
            path: 'templates',
            loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)

          },

          {
            path: 'templates/:id/editor',
            component: EditorComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'Editor',
              code: 'doceditor',
              // role: 'di'
            },
            canActivate: [Prerequisite],
          },


        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DocumentsRoutingModule { }
