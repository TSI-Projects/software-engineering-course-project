import { Component, OnInit } from '@angular/core';
import { Room, RoomsService, Bed } from '../shared/services/rooms.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public room: Room | null = null;
  public rangeDates: Date[] | undefined;
  public todayDate: Date = new Date()
  public dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private _roomsService: RoomsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    const tomorrow = new Date(this.todayDate.getTime() + (24 * 60 * 60 * 1000));
    this.dateRange.setValue({ start: this.todayDate, end: tomorrow });
  }

  get freeCancellationDate(): string {
    const startDate = (this.dateRange.get('start')?.value ?? new Date()) as Date;
    const momentDate = moment(startDate)
    return `${momentDate.format('MMMM')} ${momentDate.format('DD')}, ${momentDate.format('YYYY')}`
  }

  get guestCount(): number {
    return this.room?.beds.reduce((bedsCount: number, bed: Bed) => {
      return bedsCount + bed.count * bed.size;
    }, 0) ?? 0;
  }

  get bedsCount(): number {
    return this.room?.beds.reduce((bedsCount: number, bed: Bed) => {
      return bedsCount + bed.count;
    }, 0) ?? 0;
  }

  public async ngOnInit(): Promise<void> {
    const roomId = this._activatedRoute.snapshot.queryParams['room_id'];

    const resp = await this._roomsService.loadRoom(roomId)
    this.room = resp.data
  }

  public navigateToBookPage(): void {
    const date_from = this.dateRange.get('start')?.value as Date
    const date_to = this.dateRange.get('end')?.value as Date

    this._router.navigate(['/book'], {
      queryParams: {
        date_from: date_from.toISOString(),
        date_to: date_to.toISOString(),
        day_price: this.room?.price,
        preview_img: this.room?.images[0],
        room_name: this.room?.name,
        room_id: this.room?.id,
        room_rating: this.room?.rating
      }
    });
  }
}
