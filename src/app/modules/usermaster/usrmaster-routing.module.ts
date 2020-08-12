import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
// import { AuthGuard } from '../../../../';
import { AddComponent } from '../usermaster/user/add/add.component';
import { ViewComponent } from '../usermaster/user/view/view.component';
import { Prerequisite } from '../../service/prerequisite';

import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'User'
        },
        children: [
          {
            path: 'role',
            component: RoleComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'Role',
              code: 'role',
             // role: 'di'
            },
            canActivate: [Prerequisite],
          },
          {
            path: 'add',
            component: AddComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'Add',
              code: 'usrad',
             // role: 'di'
            },
            canActivate: [Prerequisite],
          },
          {
            path: 'view',
            component: ViewComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'View',
              code: 'usrvw',
             // role: 'di'
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

export class UsermasterRoutingModule { }
