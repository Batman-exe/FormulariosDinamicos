import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonFormData } from 'projects/dynamic-form/src/lib/dynamic-form.component'

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
    {value: 'producto-0', viewValue: 'Producto 1'},
    {value: 'producto-1', viewValue: 'Producto 2'},
    {value: 'producto-2', viewValue: 'Producto 3'},
  ];

  public formData: JsonFormData;

  constructor(private http: HttpClient) {
    this.formData = {controls:[]};
  }

  ngOnInit() {
    this.http
      .get('/assets/my-form.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });
  }
}
