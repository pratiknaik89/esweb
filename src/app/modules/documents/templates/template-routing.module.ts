import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prerequisite } from '../../../service/prerequisite';
import {AddComponent} from '../templates/add/add.component';
import {ViewComponent} from '../templates/view/view.component';

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
            path: 'add',
            component: AddComponent,
          
            data: {
              title: 'Add',
              code: 'tempadd',
            
            },
            canActivate: [Prerequisite],
          },
          {
            path: 'view',
            component: ViewComponent,
          
            data: {
              title: 'View',
              code: 'tempview',
            
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

export class TemplateRoutingModule { }
