import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required)
  },
    { validators: this.validateInputs('password', 'confirmPassword') }
  );

  constructor(
    private _auth: AuthService,
    private messageService: MessageService
  ) { }

  private validateInputs(pass: string, confirmPass: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.controls[pass];
      const confirmPassword = formGroup.controls[confirmPass];
  
      if (!password || !confirmPassword) {
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(password.value);
      const hasLowerCase = /[a-z]+/.test(password.value);
  
      if (!hasUpperCase || !hasLowerCase) {
        password.setErrors({ passwordStrength: true });
      } else {
        if (password.errors && password.errors.passwordStrength) {
          delete password.errors.passwordStrength;
          if (Object.keys(password.errors).length === 0) {
            password.setErrors(null);
          }
        }
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ confirmPasswordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
  
      return null;
    };
  }

  public clickRegisterBtn(email: string, pass: string) {
    this._auth.register(email, pass)
      .subscribe(
        res => console.log(res),
        err => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong :( Please try again later!` })
      )
  }
}
