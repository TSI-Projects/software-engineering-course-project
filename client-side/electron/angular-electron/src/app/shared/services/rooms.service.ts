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

  private selectedRoomIdCache: string = '9b1999eb-c54e-4011-9784-b37d452cd001';

  constructor(
    private _http: HttpClient,
    private messageService: MessageService
  ) {
    this.loadRooms()
  }

  get rooms(): Room[] {
    return this.roomsSubject.value ?? []
  }

  get selectedRoomId(): string {
    return this.selectedRoomIdCache
  }

  public saveSelectedRoomId(id: string) {
    this.selectedRoomIdCache = id
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

  public loadRoom(): Promise<RoomResponse> {
    return new Promise<RoomResponse>((resolve, reject) => {
      this._http.get<RoomResponse>(`${APP_CONFIG.HotelRoomEndpoint}/${this.selectedRoomId}`)
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

  public updateFiltredRooms(rooms: Room[] | null) {
    this.filtredRoomsSubject.next(rooms)
  }

  public async getRoom(id: string): Promise<Room | null> {
    try {
      const roomData$ = this._http.get<RoomResponse>(`${APP_CONFIG.HotelRoomEndpoint}/${id}`)
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
  images: string[]
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