import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly REGISTER_URL = 'http://localhost/api/v1/auth/register';
  private readonly LOGIN_URL = 'http://localhost/api/v1/auth/login';

  private tokenKey = ''

  constructor(
    private http: HttpClient
  ) { }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
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
}

export interface Response {
  accessToken: string,
  message: string
}