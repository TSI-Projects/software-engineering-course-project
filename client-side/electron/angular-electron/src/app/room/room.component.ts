import { Component, OnInit } from '@angular/core';
import { Room, RoomsService, Bed } from '../shared/services/rooms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public room: Room | null = null
  rangeDates: Date[] | undefined;
  todayDate: Date = new Date()
 
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  public images = [
    { source: '../../assets/img/start-img.png', thumbnailImageSrc: '../../assets/img/thumbnail1.png' },
    { source: '../../assets/img/our_rooms_1.png', thumbnailImageSrc: '../../assets/img/thumbnail2.png' },
    { source: '../../assets/img/our_rooms_1.png', thumbnailImageSrc: '../../assets/img/thumbnail2.png' },
    { source: '../../assets/img/our_rooms_1.png', thumbnailImageSrc: '../../assets/img/thumbnail2.png' },
    { source: '../../assets/img/our_rooms_1.png', thumbnailImageSrc: '../../assets/img/thumbnail2.png' },
    { source: '../../assets/img/our_rooms_2.png', thumbnailImageSrc: '../../assets/img/thumbnail3.png' }
  ];

  constructor(
    private _roomsService: RoomsService
  ) { 
    console.log(this.todayDate)
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    this.dateRange.setValue({start: today, end: tomorrow});
  }

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d! >= today;
  };


  async ngOnInit(): Promise<void> {
    const resp = await this._roomsService.loadRoom()
    this.room = resp.data
  }

  get bedsCount(): number {
    return this.room?.beds.reduce((bedsCount: number, bed: Bed) => {
      return bedsCount + bed.count;
    }, 0) ?? 0;
  }
}
