import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { SettingsComponent } from './settings.component';
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
        {
            path: 'gridconfig', loadChildren: () => import('./gridconfig/gridconfig.module').then(m => m.GridconfigModule)
          },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
