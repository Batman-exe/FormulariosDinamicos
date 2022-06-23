import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { MaterialExampleModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    DynamicFormComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
