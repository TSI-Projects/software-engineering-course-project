import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsSubject: BehaviorSubject<Room[] | null> = new BehaviorSubject<Room[] | null>([]);
  public rooms$: Observable<Room[] | null> = this.roomsSubject.asObservable();

  private filtredRoomsSubject: BehaviorSubject<Room[] | null> = new BehaviorSubject<Room[] | null>([])
  public filtredRooms$: Observable<Room[] | null> = this.filtredRoomsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.loadRooms()
  }

  get rooms(): Room[] {
    return this.roomsSubject.value ?? []
  }

  private loadRooms(): void {
    this.http.get<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint)
      .pipe(
        map(response => response.data),
        catchError(() => {
          this.handleResponseError()
          return of(null)
        }))
      .subscribe(rooms => {
        this.roomsSubject.next(rooms)
        this.updateFiltredRooms(rooms)
      });
  }

  public updateFiltredRooms(rooms: Room[] | null) {
    this.filtredRoomsSubject.next(rooms)
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
  amenities: Amenity[]
  images: string[]
}

export interface Bed {
  id: string
  name: string
  size: number
  count: number
}

export interface Amenity {
  id: string
  name: string
  icon: string
}