import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() type!: string;
  @Input() myFormControl!: FormControl;
}
