import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { RoomPanelComponent } from '../room-panel/room-panel.component';
import { DetailComponent } from '../detail/detail.component';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ReservationWidgetComponent } from '../reservation-widget/reservation-widget.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderPageComponent,
    RoomPanelComponent,
    DetailComponent,
    ServiceCardComponent,
    ReservationWidgetComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
