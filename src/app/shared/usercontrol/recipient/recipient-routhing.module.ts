import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prerequisite } from '../../../service/prerequisite';
import {RecipientComponent} from '../recipient/recipient.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Templates'
        },
        children: [
            {
                path: 'recipient',
                component: RecipientComponent,
              
                data: {
                  title: 'Recipient',
                 
                
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

export class RecipienRoutingModule { }
