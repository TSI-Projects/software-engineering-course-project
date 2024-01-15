import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    HomeRoutingModule,
    RatingModule
  ]
})
export class HomeModule {}
