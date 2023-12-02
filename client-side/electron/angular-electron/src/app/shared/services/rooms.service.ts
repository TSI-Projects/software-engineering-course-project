import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public async getRooms(): Promise<Room[]> {
    try {
      const roomsData$ = this.http.get<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint)
      const response = await lastValueFrom(roomsData$)
      return response.data
    } catch  {
      this.handleResponseError()
      return []
    }
  }

  public async getRoom(id: string): Promise<Room | null> {
    try {
      const roomData$ = this.http.get<RoomResponse>(`${APP_CONFIG.HotelRoomEndpoint}/${id}`)
      const response = await lastValueFrom(roomData$)
      return response.data
    } catch {
      this.handleResponseError()
      return null
    }
  }

  private handleResponseError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong :( Please try again later!' })
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
  icon: string
}