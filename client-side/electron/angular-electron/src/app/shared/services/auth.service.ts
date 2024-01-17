import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly REGISTER_URL: string = 'http://localhost/api/v1/auth/register';
  private readonly LOGIN_URL: string = 'http://localhost/api/v1/auth/login';
  private tokenKey: string = ''
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient
  ) { }

  get authStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }

  get userRole(): string {
    return 'admin'
  }

  public isAdminRole(): boolean {
    return this.isAuthenticated() && this.userRole == 'admin';
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.updateAuthStatus()
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.updateAuthStatus()
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public register(email: string, password: string): Observable<Response> {
    return this.http.post<any>(this.REGISTER_URL, { email, password });
  }

  public login(email: string, password: string): Observable<Response> {
    return this.http.post<any>(this.LOGIN_URL, { email, password });
  }

  private updateAuthStatus() {
    this.authStatusSubject.next(this.isAuthenticated());
  }
}

export interface Response {
  accessToken: string,
  message: string
}