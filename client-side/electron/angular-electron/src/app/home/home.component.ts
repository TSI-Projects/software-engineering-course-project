import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  public serviceInfo: Service[] = [{
    name: 'Bar',
    img: '../../assets/img/services/bar.png'
  },
  {
    name: 'Gaming Zone',
    img: '../../assets/img/services/2.png'
  }
  ]
  public roomInfo: Room[] = [{
    name: 'Gaming Room',
    price: '200$',
    img: '../../assets/img/rooms/1.jpeg'
  },
  {
    name: 'Gaming Room',
    price: '200$',
    img: '../../assets/img/rooms/2.jpeg'
  }]

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }
}

export interface Service {
  name: string
  img: string;
}

export interface Room {
  name: string;
  price: string;
  img: string;
}