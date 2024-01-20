import { Component } from '@angular/core';
import { RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  public rangeDates: Date[] | undefined;
  public minDate: Date;
  public adultsCount: number = 0;
  public childrenCount: number = 0;
  public roomsCount: number = 0;
  public sortByArray: Item[];
  public sortChoice: Item | undefined;

  constructor(
    public _rooms: RoomsService,
  ) {
    this.minDate = new Date()
    this.sortByArray = [
      { name: 'Rating' },
      { name: 'Price' },
    ]
  }

  public search(): void {
    this._rooms.searchRooms(
      this.rangeDates![0].toISOString(),
      this.rangeDates![1].toISOString(), 
      "asc", 
      this.sortChoice?.name!.toLowerCase()!, 
      this.childrenCount+ this.adultsCount)
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
