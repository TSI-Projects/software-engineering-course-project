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
  today = new Date();
  tomorrow = new Date();
  bookingForm: FormGroup;
 


  onCheckInDateChange(event: any) {
    const checkInDate = event.value; // получаем значение даты заезда
    const checkOutControl = this.bookingForm.get('checkOut');

    // Проверяем, что checkOutControl не null и что значение checkInDate тоже не null
    if (checkOutControl && checkInDate) {
      // Если checkOut уже выбран и он раньше checkInDate, сбрасываем его
      if (checkOutControl.value && checkInDate > checkOutControl.value) {
        checkOutControl.setValue(null);
      }

      // Обновляем минимальную дату для checkOut
      checkOutControl.setValidators([Validators.required, Validators.min(checkInDate)]);
      checkOutControl.updateValueAndValidity();
    }
  }

  onCheckOutDateChange(event: any) {
    const checkOutDate = event.value; // получаем значение даты выезда
    const checkInControl = this.bookingForm.get('checkIn');

    // Проверяем, что checkInControl не null и что значение checkOutDate тоже не null
    if (checkInControl && checkOutDate) {
      // Обновляем максимальную дату для checkIn
      checkInControl.setValidators([Validators.required, Validators.max(checkOutDate)]);
      checkInControl.updateValueAndValidity();
    }
  }

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
    this.tomorrow.setDate(this.today.getDate() + 1);
    this. bookingForm = new FormGroup({
      checkIn: new FormControl(this.today, Validators.required),
      checkOut: new FormControl(this.tomorrow, Validators.required)
    });
  }


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
