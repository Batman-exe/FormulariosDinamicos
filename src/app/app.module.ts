import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {  MaterialExampleModule} from '../material.module';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  MatNativeDateModule} from '@angular/material/core';
import {  HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from 'projects/dynamic-form/src/public-api';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    DynamicFormModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
