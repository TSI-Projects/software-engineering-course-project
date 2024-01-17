import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RoomsResponse } from './rooms.service';
import { APP_CONFIG } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomManageService {
  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }


  public fetchRoomInfo(): Promise<RoomsResponse> {
    if (!this._auth.isAdminRole()) {
      return Promise.reject(new Error("Permission denied"));
    }

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.get<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint)
        .subscribe({
          next: (resp: RoomsResponse) => {
            resolve(resp);
          },
          error: () => {
            reject(new Error("Failed to fetch rooms. Please try again later"));
          },
        });
    });
  }

  public deleteRoom(roomId: string): Promise<RoomsResponse> {
    if (!this._auth.isAdminRole()) {
      return Promise.reject(new Error("Permission denied"));
    }

    const headers = new HttpHeaders({
      'Authorization': this._auth.getToken() ?? ''
    });

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.delete<RoomsResponse>(`${APP_CONFIG.DeleteRoomEndpoint}/${roomId}`, { headers })
        .subscribe({
          next: (resp: RoomsResponse) => {
            resolve(resp);
          },
          error: () => {
            reject(new Error("Failed to fetch rooms. Please try again later"));
          },
        });
    });
  }


}
