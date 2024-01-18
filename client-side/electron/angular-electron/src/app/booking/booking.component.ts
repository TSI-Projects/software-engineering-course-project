import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  public loading: boolean = false
  load() {
    throw new Error('Method not implemented.');
  }

}
