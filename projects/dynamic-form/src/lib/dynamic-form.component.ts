import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  placeholder?: string;
  icon?: string;
  comment?: string;
  items?: FixedOptions[];
}

interface FixedOptions {
  value: string;
  viewValue: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'lib-dynamicForm',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input()jsonFormData: JsonFormData;
  darkMode: boolean = false;
  public myForm: FormGroup;
  @Output()eventData = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) { 
    this.jsonFormData = {controls:[]};
    this.myForm = this.fb.group({});
    /*Cada cambio en el formulario llama a sendForm */
    this.myForm.valueChanges.subscribe(data => {
      this.sendForm();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      this.createForm(this.jsonFormData.controls);
    }
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    if(this.myForm.valid){
      let fechaActual = new Date();
      this.myForm.addControl("fecha", this.fb.control(fechaActual, []));
    }
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    console.log("formData ", this.jsonFormData);
  }

  /*Envia los valores de myForm  como evento hac??a el lugar donde fue llamada la librer??a */
  sendForm(): void {
    this.eventData.emit(this.myForm);
  }

  ngOnInit(): void {
    
  }
}
