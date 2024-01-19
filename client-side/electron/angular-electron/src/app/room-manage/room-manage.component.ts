import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { RoomManageService } from '../shared/services/room-mange.service';
import { MessageService } from 'primeng/api';
import { Amenity, Bed, Room, RoomsService } from '../shared/services/rooms.service';
import { v4 as uuidv4 } from 'uuid';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { AuthService } from '../shared/services/auth.service';

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
    price: 0,
    beds: [],
    amenities: [],
    images: [],
    size: 0,
    guests: 0,
    rating: 0
  }

  public uploadedFiles: any[] = [];
  public rooms: Room[] = []
  public editRoomId: string | null = null;
  public newAmenityName: string = '';
  public newImageUrl: string = '';
  public newRoom: Room = this.emptyRoom
  public amenities: Amenity[] = [];
  public beds: Bed[] = [{
    id: 'asdasd',
    name: 'Hello world',
    size: 2,
    count: 0
  },
  {
    id: 'asasddasd',
    name: 'Hello world',
    size: 2,
    count: 0
  }];


  constructor(
    public _auth: AuthService,
    private _roomManageSvc: RoomManageService,
    private _messageService: MessageService,
    private _roomsSvc: RoomsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resp = await this._roomManageSvc.fetchRoomsInfo()
      this.rooms = resp.data
      this.amenities = await this._roomsSvc.loadAmenities()
      this.beds = await this._roomsSvc.loadBedTypes()
    } catch (err) {
      this.handleError(err)
    }
  }

  async customUpload($event: FileUploadHandlerEvent, room: Room) {
    await this._roomManageSvc.addMedia($event.files, room.id)
    this._messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
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
    } catch (err) {
      this.handleError(err)
    }
  }

  public deleteImage(room: Room, index: number) {
    room.images.splice(index, 1)
  }

  public isRoomDataValid(room: Room): boolean {
    return (
      room.name.trim() !== '' &&
      room.description.trim() !== '' &&
      room.price > 0 &&
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