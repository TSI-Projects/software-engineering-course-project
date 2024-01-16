import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RoomsService } from './services/rooms.service';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    WebviewDirective
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
  ],
  exports: [TranslateModule, WebviewDirective, FormsModule, HeaderComponent]
})
export class SharedModule { }
