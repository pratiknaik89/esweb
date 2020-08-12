import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvanceSearchComponent } from './advancesearch/advancesearch.comp';
import { GridComponent } from './grid/grid.comp';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AdvanceSearchComponent,
    // FocusFormDirective, 
    GridComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
    TableModule,
    NgbModule,
    CalendarModule,
    AutoCompleteModule,
    MultiSelectModule,
    CheckboxModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,

    AdvanceSearchComponent,
    NgbModule,
    GridComponent,
    AdvanceSearchComponent,
    TableModule,
    CalendarModule,
    AutoCompleteModule, MultiSelectModule,
    CheckboxModule
  ]
})
export class GridModule {

  constructor() {

  }

}
