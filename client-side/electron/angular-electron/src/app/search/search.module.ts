import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RatingModule } from 'primeng/rating';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { RoomsService } from '../shared/services/rooms.service';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { RoomsFilterModule } from './rooms-filter/rooms-filter.module';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  providers: [RoomsService],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
    CalendarModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    RatingModule,
    DropdownModule,
    ChipModule,
    DividerModule,
    TooltipModule,
    RoomsFilterModule,
    SliderModule
  ]
})

export class SearchModule { }
