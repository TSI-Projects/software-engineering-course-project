import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost/api/v1/auth/register';

  constructor(
    private http: HttpClient
  ) { }

  public register(email: string, pass: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { email, password: pass  });
  }
}
