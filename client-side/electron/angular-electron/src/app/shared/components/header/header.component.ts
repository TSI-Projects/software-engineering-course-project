import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private authSubscription: Subscription;
  public menuItems: Array<MenuItem> = [];

  constructor(
    private _router: Router,
    public _auth: AuthService,
    private _viewportScroller: ViewportScroller,
    private _cdr: ChangeDetectorRef
  ) {
    this.authSubscription = this._auth.authStatus.subscribe(
      (isAuth) => {
        this.renderMenu(isAuth);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  public async clickMenuBtn(path: string): Promise<void> {
    if (path.includes('#')) {
      const scrollTo = path.split('#')[1]
      await this._router.navigate([path])
      this._cdr.detectChanges()
      this._viewportScroller.scrollToAnchor(scrollTo);
    } else {
      this._router.navigate([path])
    }
  }

  private renderMenu(isAuthenticated: boolean): void {
    const role = this._auth.userRole;

    this.menuItems = [
      { label: 'Home', path: '/home', visible: true, isButton: false },
      { label: 'About us', path: '/home#about-us', visible: true, isButton: false },
      { label: 'Services', path: '/home#services', visible: true, isButton: false },
      { label: 'Our Rooms', path: '/home#our-rooms', visible: isAuthenticated, isButton: false },
      { label: 'Sign In', path: '/login', visible: !isAuthenticated, isButton: true, class: 'sign-in-btn' },
      { label: 'Register', path: '/registration', visible: !isAuthenticated, isButton: true, class: 'reg-btn' },
      { label: 'Logout', path: '/logout', visible: isAuthenticated, isButton: true, class: 'sign-in-btn', action: () => this._auth.logout() }
    ];
  }
}

interface MenuItem {
  label: string;
  path: string;
  visible: boolean;
  isButton: boolean;
  class?: string;
  action?: () => void;
}