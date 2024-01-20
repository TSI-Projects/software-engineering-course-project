import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  public book(first_name: string, last_name: string, phone: string, room_id: string, checkin_at: string, checkout_at: string): Promise<BookingResponse> {
    if (!this._auth.isAuthenticated) {
      return Promise.reject(new Error("Permission denied"));
    }

    return new Promise<BookingResponse>((resolve, reject) => {
      this._http.post<BookingResponse>(APP_CONFIG.BookRoomEndpoint, { first_name, last_name, phone, room_id, checkin_at, checkout_at }, { headers: this._auth.authHeader })
        .subscribe({
          next: (resp: BookingResponse) => {
            resolve(resp);
          },
          error: () => {
            reject(new Error("Failed to book this room. Please try again later"));
          },
        });
    });
  }

}

interface BookingResponse {
  message: string
}

