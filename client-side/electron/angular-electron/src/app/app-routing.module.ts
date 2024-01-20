import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { RoomRoutingModule } from './room/room-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegistrationRoutingModule } from './registration/registration-routing.module';
import { RoomMangeRoutingModule } from './room-manage/room-manage-routing.module';
import { BookingRoutingModule } from './booking/booking-routing.module';
import { RoomListRoutingModule } from './room-list/room-list-routing.module';

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
    LoginRoutingModule,
    RegistrationRoutingModule,
    RoomMangeRoutingModule,
    BookingRoutingModule,
    RoomListRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
