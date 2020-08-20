import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prerequisite } from '../../../../service/prerequisite';

import { from } from 'rxjs';
import { EvnolopeComponent } from './evnolope.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Documents'
        },
        children: [
            {
                path:'',
                component:EvnolopeComponent,
                data: {
                    title: 'Envelope',
                    code: 'envolpe',
                //    role: 'di'
                  },
                  canActivate: [Prerequisite],
            }
         

           

        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EnvelopeRoutingModule { }
