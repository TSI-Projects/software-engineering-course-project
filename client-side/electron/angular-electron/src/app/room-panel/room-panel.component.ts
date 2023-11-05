import { Component, Input } from '@angular/core';
import { Room } from '../home/home.component';

@Component({
  selector: 'app-room-panel',
  templateUrl: './room-panel.component.html',
  styleUrls: ['./room-panel.component.scss']
})


export class RoomPanelComponent {
  @Input() room: Room | null = null;
}


