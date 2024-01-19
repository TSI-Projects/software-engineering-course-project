import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceService } from '../shared/services/booking.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public loading: boolean = false
  public dateFrom: string = ''
  public dateTo: string = ''
  public nightPrice: number = 0
  public previewImg: string = ''
  public roomId: string = ''
  public roomName: string = ''
  public roomRating: string = ''
  public selectedOption: string = 'fee'
  public bookForm: FormGroup

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bookingSrv: BookingServiceService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.bookForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl('')
    });
  }

  get formatedDates(): string {
    const start = moment(this.dateFrom);
    const end = moment(this.dateTo);

    if (start.month() === end.month()) {
      return `${start.format('MMM D')}-${end.format('D')}`;
    } else {
      return `${start.format('MMM D')} - ${end.format('MMM D')}`;
    }
  }

  get fee(): string {
    return ((this.nightPrice * this.nights) * 0.01).toFixed(2)
  }

  get nights(): number {
    const start = moment(this.dateFrom);
    const end = moment(this.dateTo);
    return end.diff(start, 'days') + 1;
  }

  get formatedRoomRating(): string {
    return Number(this.roomRating).toFixed(2)
  }

  get totalPrice(): string {
    return (this.nights * this.nightPrice).toFixed(2);
  }

  get totalPriceWithFee(): string {
    return (Number(this.totalPrice) + Number(this.fee)).toFixed(2);
  }

  public ngOnInit(): void {
    this.dateFrom = this._activatedRoute.snapshot.queryParams['date_from'];
    this.dateTo = this._activatedRoute.snapshot.queryParams['date_to'];
    this.nightPrice = this._activatedRoute.snapshot.queryParams['day_price'];
    this.previewImg = this._activatedRoute.snapshot.queryParams['room_img_url'];
    this.roomId = this._activatedRoute.snapshot.queryParams['room_id'];
    this.roomName = this._activatedRoute.snapshot.queryParams['room_name'];
    this.roomRating = this._activatedRoute.snapshot.queryParams['room_rating'];
  }

  async book(): Promise<void> {
    try {
      await this._bookingSrv.book(
        this.bookForm.get('firstName')!.value,
        this.bookForm.get('lastName')!.value,
        this.bookForm.get('phone')!.value,
        this.roomId,
        this.dateFrom,
        this.dateTo,
      )
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Reservation completed successfuly'
      })
      this._router.navigate(['/home'])
    } catch (err) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong :( Please try again later!'
      })
    }
  }
}
