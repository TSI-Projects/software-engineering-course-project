import { Component, Input } from '@angular/core';
import { Service } from '../home/home.component';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input() service: Service | null = null;
}
