import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ]
})
export class RegistrationModule {}
