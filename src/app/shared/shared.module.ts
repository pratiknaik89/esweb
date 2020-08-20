import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './usercontrol/button/button.component';
import { FocusDirective } from "../directive/focus.directive";
// import { FocusFormDirective } from "../directive/focusform.directive";
import { NumberWithDecimal } from "../directive/numberwithdecimal.directive";
import { NumberDirective } from '../directive/numbers-only.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from './usercontrol/grid.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ActionBarComponent } from './usercontrol/actionbar/actbar.comp';
import { DropdownModule } from 'primeng/dropdown';

// import { ItemsearchComponent } from '../views/common/itemsearch/itemsearch.component';
import { IngredientsComponent } from '../views/common/ingredients/ingredients.component';
import { InputSwitchModule } from 'primeng/inputswitch';

import { SettingsComponent } from './settings/settings.component';
import { BaseRefService } from '../service/base-ref.service';
import {
  AppBreadcrumbModule
} from '@coreui/angular';
import { ToastrModule } from 'ngx-toastr';
import {GroupByPipe} from '../pipes/groupby.pipe'
 
import {RecipientModule} from '../shared/usercontrol/recipient/recipient.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    ButtonComponent,
    FocusDirective,
    NumberWithDecimal,
    NumberDirective,
    ActionBarComponent,

    // ItemsearchComponent
    IngredientsComponent,
    SettingsComponent,
    GroupByPipe
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    AppBreadcrumbModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
    //TableModule,
    NgbModule,
    GridModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    InputSwitchModule,
     
    RecipientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    DropdownModule,
    ButtonComponent,
    FocusDirective,
    // FocusFormDirective,

    NumberWithDecimal,
    NumberDirective,
    NgbModule,
    GridModule,
    ActionBarComponent,
    // ItemsearchComponent,
    InputSwitchModule,
    IngredientsComponent,
    SettingsComponent,
    AppBreadcrumbModule,
    GroupByPipe,
    RecipientModule
  ],
  providers: []
})
export class SharedModule {

  constructor() {

  }

}
