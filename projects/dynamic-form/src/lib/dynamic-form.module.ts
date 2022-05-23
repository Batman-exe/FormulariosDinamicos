import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { MaterialExampleModule } from '../material.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    MaterialExampleModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
