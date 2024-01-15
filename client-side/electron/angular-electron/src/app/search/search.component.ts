import { Component, OnInit } from '@angular/core';
import { Bed, Room, RoomResponse, RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent{
  public rangeDates: Date[] | undefined;
  public minDate: Date;
  public adultsCount: number = 0;
  public childrenCount: number = 0;
  public roomsCount: number = 0;
  public sortByArray: Item[];
  public sortChoice: string | undefined;



  public defaultImg = '../../assets/img/our_rooms_2.png'

  constructor(
    public _rooms: RoomsService,
  ) {
    this.minDate = new Date()
    this.sortByArray = [
      { name: 'Rating' },
      { name: 'Price' },
      { name: 'Review' }
    ]
  }

  public search(): void {


  }

  public decrement(count: number): number {
    if (count > 0) {
      return count -= 1
    }
    return count
  }

  public increment(count: number): number {
    return count += 1
  }
}

export interface Item {
  name: string
}