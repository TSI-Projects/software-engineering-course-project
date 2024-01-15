import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';

import { RegistrationComponent } from './registration.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    RegistrationRoutingModule,
  ]
})
export class RegistrationModule {}
