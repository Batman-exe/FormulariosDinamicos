import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DynamicFormComponent, JsonFormData } from 'projects/dynamic-form/src/lib/dynamic-form.component'
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormModule } from 'projects/dynamic-form/src/public-api';

interface FixedOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formsTest';

  options: FixedOptions[] = [
    {value: 'producto-1', viewValue: 'Producto 1'},
    {value: 'producto-2', viewValue: 'Producto 2'},
    {value: 'producto-3', viewValue: 'Producto 3'},
  ];

  public formData: JsonFormData;
  public formData2: JsonFormData;

  formularioUno = new FormGroup({
    productos: new FormControl()
  });

  constructor(private http: HttpClient) {
    this.formData = {controls:[]};
    this.formData2 = {controls:[]};
  }

  ngOnInit() {
    this.http
      .get('/assets/my-form.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });

      this.http
      .get('/assets/my-form2.json')
      .subscribe((formData2: any) => {
        this.formData2 = formData2;
      });
  }

  getDynamicFormData(form: FormGroup){
    //var length = Object.keys(form).length;
    Object.keys(form.value).forEach(key =>{
      this.formularioUno.addControl(key, form.controls[key]); 
    })
  }

  onClick(){
    console.log("total", this.formularioUno.value);
    console.log("Valid", this.formularioUno.valid)
  }
}
