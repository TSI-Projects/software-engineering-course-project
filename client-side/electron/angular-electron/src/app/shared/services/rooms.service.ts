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
    private _http: HttpClient,
    private messageService: MessageService
  ) {
    this.loadRooms()
  }

  get rooms(): Room[] {
    return this.roomsSubject.value ?? []
  }

  private loadRooms(): void {
    this._http.get<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint)
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

  public loadRoom(roomId: string): Promise<RoomResponse> {
    return new Promise<RoomResponse>((resolve, reject) => {
      this._http.get<RoomResponse>(`${APP_CONFIG.HotelRoomEndpoint}/${roomId}`)
        .subscribe({
          next: (resp: RoomResponse) => {
            resolve(resp);
          },
          error: () => {
            reject(new Error("Failed to fetch rooms. Please try again later"));
          },
        });
    });
  }

  public loadAmenities(): Promise<Amenity[]> {
    return new Promise<Amenity[]>((resolve, reject) => {
      this._http.get<AmenitiesResponse>(APP_CONFIG.AmenitiesEndpoint)
        .subscribe({
          next: (resp: AmenitiesResponse) => {
            resolve(resp.data);
          },
          error: () => {
            reject(new Error("Failed to fetch amenities. Please try again later"));
          },
        });
    });
  }

  public loadBedTypes(): Promise<Bed[]> {
    return new Promise<Bed[]>((resolve, reject) => {
      this._http.get<BedTypeResponse>(APP_CONFIG.BedsTypeEndpoint)
        .subscribe({
          next: (resp: BedTypeResponse) => {
            resolve(resp.data);
          },
          error: () => {
            reject(new Error("Failed to fetch beds types. Please try again later"));
          },
        });
    });
  }

  public loadPrice(): Promise<PriceResponse> {
    return new Promise<PriceResponse>((resolve, reject) => {
      this._http.get<PriceResponse>(APP_CONFIG.PriceEndpoint)
        .subscribe({
          next: (resp: PriceResponse) => {
            resolve(resp);
          },
          error: () => {
            reject(new Error("Failed to fetch beds types. Please try again later"));
          },
        });
    });
  }

  public searchRooms(checkin: string, checkout: string, direction: string, column: string, guests: number): void {
    const payload = {
      guest_count: guests,
      order_by: { 
        direction,
        column: column
      },
      checkin_at: checkin,
      checkout_at: checkout
    }

    this._http.post<RoomsResponse>(APP_CONFIG.HotelRoomsEndpoint + '/filter', payload)
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
      const roomData$ = this._http.get<RoomResponse>(`${APP_CONFIG.HotelRoomEndpoint}/${id}`, { params: { include_unavailable_dates: true } })
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

export interface PriceResponse {
  min: number
  max: number
}

export interface BedTypeResponse {
  data: Bed[]
  meta: Meta
}

export interface AmenitiesResponse {
  data: Amenity[]
  meta: Meta
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
  price: number
  beds: Bed[]
  images: string[]
  size: number
  guests: number
  rating: number
  amenities: Amenity[]
  reserved_dates: ReservedDates[]
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

export interface ReservedDates {
  checkin_at: string
  checkout_at: string
}