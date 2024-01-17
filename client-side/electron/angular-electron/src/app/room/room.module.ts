import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    RoomRoutingModule,
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class RoomModule {}
