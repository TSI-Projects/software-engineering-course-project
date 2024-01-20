import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  public defaultImg = '../../assets/img/our_rooms_2.png'

  constructor(
    private _router: Router,
    public _rooms: RoomsService
  ) {}

  public selectRoom(room_id: string): void {
    this._router.navigate(['/room'], {
      queryParams: { room_id }
    });
  }
}
