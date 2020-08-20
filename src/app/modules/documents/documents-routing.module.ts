import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prerequisite } from '../../service/prerequisite';

import { from } from 'rxjs';

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
                path: 'envolope',
                loadChildren: () => import('./envolope/envolope.module').then(m => m.EnvolopeModule),
      
              },
              {
                path: 'templates',
                loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule),
      
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
