import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY_NAME: string = 'auth_token';
  private readonly ROLE_KEY_NAME: string = 'user_role';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient
  ) { }

  get authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  get authStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }

  get role(): string {
    return localStorage.getItem(this.ROLE_KEY_NAME) ?? '';
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY_NAME);
  }

  public isAdminRole(): boolean {
    return this.isAuthenticated() && this.role == 'admin';
  }

  public saveRole(isAdmin: boolean): void {
    localStorage.setItem(this.ROLE_KEY_NAME, isAdmin ? 'admin' : 'user');
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY_NAME, token);
    this.updateAuthStatus()
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.http.post<any>(APP_CONFIG.LogoutEndpoint, {}, { headers: this.authHeader })
        .subscribe({
          next: () => {
            localStorage.removeItem(this.TOKEN_KEY_NAME);
            localStorage.removeItem(this.ROLE_KEY_NAME);
            this.updateAuthStatus()
            resolve();
          },
          error: () => {
            reject(new Error("Failed to logout"));
          },
        });
    });
  }

  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  public register(email: string, password: string): Observable<Response> {
    return this.http.post<any>(APP_CONFIG.RegisterEndpoint, { email, password });
  }

  public login(email: string, password: string): Observable<Response> {
    return this.http.post<any>(APP_CONFIG.LoginEndpoint, { email, password });
  }

  private updateAuthStatus() {
    this.authStatusSubject.next(this.isAuthenticated());
  }
}

export interface Response {
  accessToken: string
  is_admin: boolean
}