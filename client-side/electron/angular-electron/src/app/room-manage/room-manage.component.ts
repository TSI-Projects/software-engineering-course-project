import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RoomManageService } from '../shared/services/room-mange.service';
import { MessageService } from 'primeng/api';
import { Amenity, Bed, Room } from '../shared/services/rooms.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.scss']
})
export class RoomManageComponent implements OnInit {
  private emptyRoom: Room = {
    id: '',
    name: '',
    description: '',
    price: '',
    beds: [{
      id: '',
      name: '',
      size: 0,
      count: 0
    }],
    amenities: [],
    images: [],
    roomCount: 1,
    size: 0,
    guests: 0,
    rating: 0
  }

  public rooms: Room[] = []
  public editRoomId: string | null = null;
  public newAmenityName: string = '';
  public newImageUrl: string = '';
  public newRoom: Room = this.emptyRoom


  constructor(
    private _roomManageSvc: RoomManageService,
    private _messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resp = await this._roomManageSvc.fetchRoomInfo()
      this.rooms = resp.data
    } catch (err) {
      this.handleError(err)
    }
  }

  public async modifyRoom(room: Room): Promise<void> {
    try {
      await this._roomManageSvc.modifyRoom(room)
    } catch (err) {
      this.handleError(err)
    }
  }

  public async deleteRoom(roomId: string): Promise<void> {
    try {
      await this._roomManageSvc.deleteRoom(roomId)
      this.rooms = this.rooms.filter(room => room.id != roomId)
    } catch (err) {
      this.handleError(err)
    }
  }

  public async addNewRoom(): Promise<void> {
    try {
      await this._roomManageSvc.addNewRoom(this.newRoom)
      this.rooms.push(this.newRoom)
      this.newRoom = this.emptyRoom
    }catch (err) {
      this.handleError(err)
    }
  }

  public deleteImage(room: Room, index: number) {
    room.images.splice(index, 1)
  }

  public addImage(room: Room, newUrl: string) {
    if (!newUrl) {
      return
    }
    room.images.push(newUrl);
    this.newImageUrl = ''
  }

  public addAmenity(room: Room, amenityName: string): void {
    if (!amenityName) {
      return
    }

    room.amenities.push({
      name: amenityName,
      id: uuidv4(),
      icon: '',
    })
    this.newAmenityName = ''
  }

  public deleteAmenity(room: Room, amenityId: string): void {
    room.amenities = room.amenities.filter(amenity => amenity.id != amenityId);
  }

  public addNewBed(newRoom: Room): void {
    newRoom.beds.push({
      id: '',
      name: '',
      size: 0,
      count: 0
    })
  }

  public deleteBed(room: Room, index: number): void {
    room.beds.splice(index, 1);
  }

  public isRoomDataValid(room: Room): boolean {
    return (
      room.name.trim() !== '' &&
      room.description.trim() !== '' &&
      room.price.trim() !== '' &&
      room.beds.every(bed => bed.name.trim() !== '' && bed.size > 0 && bed.count > 0)
    );
  }

  private handleError(err: unknown): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: err instanceof Error ? err.message : 'Something went wrong :( Please try again later!'
    })
  }
}


@Pipe({ name: 'joinAmenities' })
export class JoinAmenitiesPipe implements PipeTransform {
  transform(amenities: Amenity[]): string {
    return amenities.map(amenity => amenity.name).join(', ');
  }
}