import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RoomsService } from './services/rooms.service';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from './services/auth.service';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { FormButtonComponent } from './components/form/form-button/form-button.component';
import { FormCardComponent } from './components/form/form-card/form-card.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    WebviewDirective,
    FormInputComponent,
    FormButtonComponent,
    FormCardComponent,
  ],
  providers: [
    RoomsService,
    MessageService,
    AuthService
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MessagesModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    HeaderComponent,
    FormInputComponent,
    FormButtonComponent,
    FormCardComponent,
  ]
})
export class SharedModule { }
