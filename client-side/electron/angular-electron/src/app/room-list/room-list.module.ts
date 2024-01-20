import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { RoomsService } from '../shared/services/rooms.service';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { RoomListComponent } from './room-list.component';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { RoomsFilterModule } from "../search/rooms-filter/rooms-filter.module";
import { SearchModule } from '../search/search.module';

@NgModule({
    declarations: [
        RoomListComponent
    ],
    providers: [RoomsService],
    imports: [
        CommonModule,
        SharedModule,
        CalendarModule,
        BrowserAnimationsModule,
        OverlayPanelModule,
        RatingModule,
        DropdownModule,
        ChipModule,
        DividerModule,
        TooltipModule,
        SliderModule,
        CardModule,
        FileUploadModule,
        MultiSelectModule,
        RoomsFilterModule,
        SearchModule
    ]
})

export class RoomListModule { }
