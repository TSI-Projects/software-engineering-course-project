import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private roomId: string = ''
  public roomName: string = ''
  public roomRating: string = ''

  public bookForm: FormGroup

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bookingSrv: BookingServiceService,
    private _messageService: MessageService
    
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

  get nights(): number {
    const start = moment(this.dateFrom);
    const end = moment(this.dateTo);
    return end.diff(start, 'days') + 1;

  }

  get totalPrice(): number {
    const totalWithoutFee = this.nights * this.nightPrice;
    const fee = totalWithoutFee * 0.01;
    return totalWithoutFee + fee;
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
    } catch (err) {
      this._messageService.add({ 
        severity: 'error', 
        summary: 'Login Error', 
        detail: 'Something went wrong :( Please try again later!' 
      })
    }
  }
}
