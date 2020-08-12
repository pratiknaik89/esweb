import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{GridconfigComponent} from '../../settings/gridconfig/gridconfig.component';


const routes: Routes = [
  {
    path: '',


    children: [
      {
        path: '',
        component: GridconfigComponent,
       
        data: {
          title: 'Grid Configuration',
          code: '999'

        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GridConfigRoutingModule { }
