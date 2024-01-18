import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Room, RoomsResponse } from './rooms.service';
import { APP_CONFIG } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomManageService {
  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }


  public fetchRoomsInfo(): Promise<RoomsResponse> {
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
      'Authorization': `Bearer ${this._auth.getToken()}`
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

  public addNewRoom(room: Room): Promise<RoomsResponse> {
    if (!this._auth.isAdminRole()) {
      return Promise.reject(new Error("Permission denied"));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._auth.getToken()}`
    });

    const payload = {
      name: room.name,
      description: room.description,
      price: room.price,
      size: room.size,
      room_count: room.roomCount,
      amenities: room.amenities,
      beds: room.beds
    }

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.post<RoomsResponse>(`${APP_CONFIG.HotelRoomsEndpoint}`, payload, { headers })
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

  public modifyRoom(room: Room): Promise<RoomsResponse> {
    if (!this._auth.isAdminRole()) {
      return Promise.reject(new Error("Permission denied"));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._auth.getToken()}`
    });

    const payload = {
      name: room.name,
      description: room.description,
      price: room.price,
      size: room.size,
      room_count: room.roomCount,
      amenities: room.amenities,
      beds: room.beds
    }

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.patch<RoomsResponse>(`${APP_CONFIG.HotelRoomsEndpoint}/${room.id}`, payload, { headers })
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
