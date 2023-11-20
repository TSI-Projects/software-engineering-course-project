import { Component } from '@angular/core';

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
  public sortByArray: string[] = ["Popular", "Price", "Reviews"]
  public sortChoice: string | undefined;

  constructor() {
    this.minDate = new Date()
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
