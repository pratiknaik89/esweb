import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewComponent } from './view/view.component';
import {BannerComponent} from './banner/banner.component';
import {LandingPageComponent} from './landingpage/landingpage.component';
import { ListComponent } from './list/list.component';
import { Prerequisite } from '../../service/prerequisite';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      data: {
        title: 'Company'
      },
      children: [{
        path: 'add',
        data: {
          code: 'acomp',
          title: 'Add'
        },
        //canActivate: [AuthGuard],
        component: AddComponent,
      }, {
        path: 'companyprofile',
        data: {
          code: 'pcomp',
          title: 'Company Profile'
        },
        //canActivate: [AuthGuard],
        component: ProfileComponent,
      }, {
        path: 'view',
        data: {
          code: 'vcomp',
          title: 'View '
        },
        //canActivate: [AuthGuard],
        component: ViewComponent,
        }, {
          path: 'list',
          data: {
            code: 'lcomp',
            title: 'List '
          },
          //canActivate: [AuthGuard],
          component: ListComponent,
        },{
        path: 'edit/:id',
        data: {
          code: 'acomp',
          title: 'Edit '
        },
        //canActivate: [AuthGuard],
        component: AddComponent,
        }, {
          path: 'editProfile/:id',
          data: {
            code: 'pcomp',
            title: 'Edit Profile'
          },
          //canActivate: [AuthGuard],
          component: ProfileComponent,
        },{
        path: 'banner',
        data: {
          code: 'ban',
          title: 'Add Banner',
          role: 'co'
        },
        canActivate: [Prerequisite],
        component: BannerComponent,
      } ,{
        path: 'landingpage',
        data: {
          code: 'lanpg',
          title: 'Add Landingpage',
          role: 'co'
        },
        canActivate: [Prerequisite],
        component: LandingPageComponent,
        
      } ]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
