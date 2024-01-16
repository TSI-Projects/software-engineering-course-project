import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { 
  constructor(
    private _router: Router,
    public _auth: AuthService
    ){}

  public clickMenuBtn(path: string): void {
    this._router.navigate([path])
  }

}
