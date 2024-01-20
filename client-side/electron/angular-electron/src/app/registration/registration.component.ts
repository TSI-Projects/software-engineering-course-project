import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private messageService: MessageService,
    private _router: Router,
  ) { }

  get emailError(): string {
    if (this.registrationForm.controls.email.touched && this.registrationForm.controls.email.errors) {
      if (this.registrationForm.controls.email.errors?.required) {
        return 'Email is required.';
      }

      if (this.registrationForm.controls.email.errors?.email) {
        return 'Please enter a valid email address.';
      }
    }

    return '';
  }

  get passwordError(): string {
    if (this.registrationForm.controls.password.touched && this.registrationForm.controls.password.errors) {
      if (this.registrationForm.controls.password.errors?.required) {
        return 'Password is required.';
      }

      if (this.registrationForm.controls.password.errors?.minlength) {
        return `Password must be at least ${this.registrationForm.controls.password.errors.minlength.requiredLength}`;
      }

      if (this.registrationForm.controls.password.errors?.passwordStrength) {
        return 'Your password must contain lowercase and uppercase letters, numbers, and special symbols.';
      }
    }

    return '';
  }

  get confirmPasswordError(): string {
    if (this.registrationForm.controls.confirmPassword.touched && this.registrationForm.controls.confirmPassword.errors) {
      if (this.registrationForm.controls.confirmPassword.errors?.required) {
        return 'Confirming password is required.';
      }

      if (this.registrationForm.controls.confirmPassword.errors?.confirmPasswordMismatch) {
        return 'Passwords must match.';
      }
    }

    return '';
  }

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
      const hasNumber = /[0-9]+/.test(password.value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(password.value);

      if (!hasLowerCase || !hasNumber || !hasSpecialChar || !hasUpperCase) {
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

  public clickRegisterBtn() {
    const email = this.registrationForm.get('email')?.value ?? '';
    const password = this.registrationForm.get('password')?.value ?? '';

    this._auth.register(email, password)
      .subscribe(
        res => {
          this._auth.saveToken(res.accessToken)
          this._auth.saveRole(res.is_admin)
          this._router.navigate(['/home'])
        },
        err => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message ?? `Something went wrong :( Please try again later!` })
      )
  }
}
