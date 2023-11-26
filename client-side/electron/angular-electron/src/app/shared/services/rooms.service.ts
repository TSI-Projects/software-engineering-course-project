import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  get rooms(): Observable<RoomsResponse | undefined> {
    return this.http.get<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint).pipe(
      catchError(error => this.handleError(error))
    )
  }

  public getRoom(id: string): Observable<RoomResponse | undefined> {
    const endpoint = `${APP_CONFIG.HotelRoomEndpoint}/${id}`
    return this.http.get<RoomResponse>(endpoint).pipe(
      catchError(error => this.handleError(error))
    )
  }

  private handleError(error: HttpErrorResponse):Observable<undefined> {
    console.log(error)
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong :( Please try again later!' })
    return of(undefined);
  }
}

export interface RoomsResponse {
  data: Room[]
  meta: Meta
}

export interface RoomResponse {
  data: Room
}

export interface Meta {
  currentPage: string
  from: string
  lastPage: string
  perPage: string
  to: string
  total: string
}

export interface Room {
  id: string
  name: string 
  description: string 
  price: string
  beds: Bed[]
  amenities: Amenities[]
  media: string[]
}

export interface Bed {
  id: string
  name: string
  size: number 
  count: number
}

export interface Amenities {
  id: string 
  name: string 
}