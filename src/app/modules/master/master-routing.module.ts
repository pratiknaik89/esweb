import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Prerequisite } from '../../service/prerequisite';
import {AddComponent} from '../master/add/add.component';
import { ViewComponent}from '../master/view/view.component'; 
const routes: Routes = [
    {
       path:'',
       data:{
           title:'Masters'

       },
       children:[
        // {
        //     path: 'add',
        //     component: AddComponent,
        //     //canActivate: [AuthGuard],
        //     data: {
        //       title: 'Add',
        //       code: 'usrad',
        //      // role: 'di'
        //     },
        //     canActivate: [Prerequisite],
        //   },
          {
            path: '',
            component: ViewComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'View',
              code: 'mstr',
             // role: 'di'
            },
            canActivate: [Prerequisite],
          }
    ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MasterRoutingModule { }