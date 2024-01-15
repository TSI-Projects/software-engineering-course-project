import { NgModule } from "@angular/core";
import { RoomsFilterComponent } from "./rooms-filter.component";
import { SliderModule } from 'primeng/slider';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [
      RoomsFilterComponent
    ],
    imports: [
        SliderModule,
        BrowserModule,
        FormsModule,
        CheckboxModule
    ],
    exports: [RoomsFilterComponent]
  })
  
  export class RoomsFilterModule {}
  