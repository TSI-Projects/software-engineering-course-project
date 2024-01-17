import { Component, OnInit } from '@angular/core';
import { Room, RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public room: Room | null = null
  
  
  constructor(
    private _roomsService: RoomsService
  ) {}


  async ngOnInit(): Promise<void> {
    const resp = await this._roomsService.loadRoom()
    this.room = resp.data
  }

  
    
}
