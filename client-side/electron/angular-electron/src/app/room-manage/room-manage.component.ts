import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RoomManageService } from '../shared/services/room-mange.service';
import { MessageService } from 'primeng/api';
import { Amenity, Room } from '../shared/services/rooms.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.scss']
})
export class RoomManageComponent implements OnInit {

  public rooms: Room[] = []
  public editRoomId: string | null = null;
  public newAmenityName: string = '';
  public newImageUrl: string = '';

  constructor(
    private _roomManageSvc: RoomManageService,
    private _messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resp = await this._roomManageSvc.fetchRoomInfo()
      this.rooms = resp.data
    } catch (err) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err instanceof Error ? err.message : 'Something went wrong :( Please try again later!'
      })
    }
  }

  saveRoom(room: Room): void {

  }

  async deleteRoom(roomId: string): Promise<void> {
   await this._roomManageSvc.deleteRoom(roomId)
   this.rooms = this.rooms.filter(room => room.id != roomId)
  }

  deleteImage(room: Room, index: number) {
    room.images.splice(index, 1)
  }


  addImage(room: Room, newUrl: string) {
    if (!newUrl) {
      return
    }
    room.images.push(newUrl);
    this.newImageUrl = ''
  }

  addAmenity(room: Room, amenityName: string): void {
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

  deleteAmenity(room: Room, amenityId: string): void {
    room.amenities = room.amenities.filter(amenity => amenity.id != amenityId);
  }


}


@Pipe({ name: 'joinAmenities' })
export class JoinAmenitiesPipe implements PipeTransform {
  transform(amenities: Amenity[]): string {
    return amenities.map(amenity => amenity.name).join(', ');
  }
}