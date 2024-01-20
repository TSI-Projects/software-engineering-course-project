import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) { }

  get emailError(): string {
    if (this.loginForm.controls.email.invalid && (this.loginForm.controls.email.dirty || this.loginForm.controls.email.touched)) {
      if (this.loginForm.controls.email.errors?.required) {
        return 'Email is required.';
      }

      if (this.loginForm.controls.email.errors?.email) {
        return 'Not a valid email.';
      }
    }

    return '';
  }

  get passwordError(): string {
    if (this.loginForm.controls.password.invalid && (this.loginForm.controls.password.dirty || this.loginForm.controls.password.touched)) {
      if (this.loginForm.controls.password.errors?.required) {
        return 'Password is required.';
      }
    }
    return '';
  }

  public clickSignInBtn() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this._auth.login(email!, password!).subscribe({
        next: resp => {
          this._auth.saveToken(resp.accessToken)
          this._auth.saveRole(resp.is_admin)
            this._router.navigate(['/home'])
        },
        error: () => this._messageService.add({
          severity: 'error',
          summary: 'Login Error',
          detail: 'Invalid email or password'
        }),
      });
    }
  }
}
