import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country, State, City }  from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city/lib/interface'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {
  countryDropdownSettings: IDropdownSettings;
  stateDropdownSettings: any;
  cityDropdownSettings: any;
  form: FormGroup;
  countries : ICountry[] = [];
  states : IState[] = [];
  cities : ICity[] = [];
  selectedCountryCode : string;

  subscriptions : Subscription[] = [];
  firstName : String;
  lastName : String;
  constructor(private formBuilder : FormBuilder, private http : HttpClient){
    this.countryDropdownSettings = {
      singleSelection: true,
      idField: 'isoCode',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight : 100
    };
    this.form = this.formBuilder.group({
      country : ['IN',[Validators.required]],
      state : ['TG'],
      city : ['DL']
    });
    this.selectedCountryCode = "";
    this.firstName = "";
    this.lastName = "";
  }

  ngOnInit(){
     this.initForm();
     this.initDropdownSettings();
     this.getCountries();
     this.handleValueChanges();
    //this.callAPIData();
  }

  handleResetClick(){
    this.form.patchValue({
      country : []
    })
  }

  callAPIData(){
    this.http.get('/api/getData').subscribe(response => {
      console.log('response is ', response);
    })
  }

  handleValueChanges(){
    let country =  this.form.get('country');
    if (country != null){
      this.subscriptions.push(country.valueChanges.subscribe((response) => {
        this.selectedCountryCode = response[0].isoCode;
        this.getState(response[0].isoCode);
      }));
    }
    let state = this.form.get('state');
    if (state != null){
      this.subscriptions.push(state.valueChanges.subscribe((response) => {
        this.getCity(this.selectedCountryCode,response[0].isoCode);
      }))
    }
  }

  initDropdownSettings(){
    this.countryDropdownSettings = {
      singleSelection: true,
      idField: 'isoCode',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight : 100
    };
  }

  getCountries(){
    this.countries = Country.getAllCountries();    
  }

  getState(countryCode: string){
    this.states = State.getStatesOfCountry(countryCode);
  }

  getCity(countryCode: string , stateCode: string){
    this.cities = City.getCitiesOfState(countryCode, stateCode);
  }

  initForm(){
    this.form = this.formBuilder.group({
      country : ['',[Validators.required]],
      state : [''],
      city : ['']
    })
  }

  customValidtor(abstractControl  : AbstractControl){
    console.log('control is ', abstractControl);
    return null;

  }

  handleButtonClick(){
    if(!this.form.valid) this.form.markAllAsTouched();
  }

  ngOnDestroy(){
    this.subscriptions.forEach(item => {
      if(item) item.unsubscribe();
    })
  }

  private getFullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}
