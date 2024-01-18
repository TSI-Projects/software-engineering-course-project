import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { RoomRoutingModule } from './room/room-routing.module';
import { SearchRoutingModule } from './search/search-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegistrationRoutingModule } from './registration/registration-routing.module';
import { RoomMangeRoutingModule } from './room-manage/room-manage-routing.module';
import { BookingRoutingModule } from './booking/booking-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
    // component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule,
    RoomRoutingModule,
    SearchRoutingModule,
    LoginRoutingModule,
    RegistrationRoutingModule,
    RoomMangeRoutingModule,
    BookingRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
