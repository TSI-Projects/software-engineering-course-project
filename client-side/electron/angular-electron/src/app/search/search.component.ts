import { Component, OnInit } from '@angular/core';
import { Room, RoomResponse, RoomsResponse, RoomsService } from '../shared/services/rooms.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{
  public rangeDates: Date[] | undefined;
  public minDate: Date;
  public adultsCount: number = 0;
  public childrenCount: number = 0;
  public roomsCount: number = 0;
  public sortByArray: Item[];
  public sortChoice: string | undefined;

  public rooms: RoomsResponse | undefined = undefined;
  public room: RoomResponse | undefined = undefined;

  constructor(
   private searchService: RoomsService,
  ) {
    this.minDate = new Date()
    this.sortByArray = [
      {name: 'Rating'},
      {name: 'Price'},
      {name: 'Review'}
    ]
  }

  ngOnInit(): void {

  }


  public search(): void {
    const rooms = this.searchService.rooms
 
    rooms.subscribe(response => {
      if (response) {
        this.rooms = response
        this.searchService.getRoom(response.data[0].id).subscribe(data => {
          this.room = data
          console.log(this.rooms)
          console.log(this.room)
        })
      }
    })
  }

  public decrement(count: number): number {
    if (count > 0) {
      return count-=1
    }
    return count
  }

  public increment(count: number): number {
    return count+=1
  }
}

export interface Item {
  name: string
}
