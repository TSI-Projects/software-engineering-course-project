import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    RoomRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    GalleriaModule,
    CalendarModule,
    FormsModule,
    DividerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class RoomModule {}
