import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from './select-search/select-search.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialModule } from '../module-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SelectSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MaterialModule
  ],
  exports: [
    SelectSearchComponent
  ]
})
export class ShareModule { }
