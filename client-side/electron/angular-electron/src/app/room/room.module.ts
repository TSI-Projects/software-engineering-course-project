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
    DividerModule
  ]
})
export class RoomModule {}
