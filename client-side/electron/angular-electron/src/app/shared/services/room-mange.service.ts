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
    private _auth: AuthService,
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

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.delete<RoomsResponse>(`${APP_CONFIG.DeleteRoomEndpoint}/${roomId}`, { headers: this._auth.authHeader })
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

  public addMedia(files: File[], roomId: string): Promise<void> {
    if (!this._auth.isAdminRole()) {
      return Promise.reject(new Error("Permission denied"));
    }

    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i], files[i].name);
    }

    return new Promise<void>((resolve, reject) => {
      this._http.post(`${APP_CONFIG.HotelRoomsEndpoint}/${roomId}/media/upload`, formData, { headers: this._auth.authHeader })
        .subscribe({
          next: () => {
            resolve();
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

    const payload = {
      name: room.name,
      description: room.description,
      price: room.price,
      size: room.size,
      amenities: room.amenities.map(amenity => ({ id: amenity.id })),
      beds: room.beds.map(bed => ({ id: bed.id, count: bed.count }))
    }

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.post<RoomsResponse>(`${APP_CONFIG.HotelRoomsEndpoint}`, payload, { headers: this._auth.authHeader })
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

    const payload = {
      name: room.name,
      description: room.description,
      price: room.price,
      size: room.size,
      amenities: room.amenities,
      beds: room.beds
    }

    return new Promise<RoomsResponse>((resolve, reject) => {
      this._http.patch<RoomsResponse>(`${APP_CONFIG.HotelRoomsEndpoint}/${room.id}`, payload, { headers: this._auth.authHeader })
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
