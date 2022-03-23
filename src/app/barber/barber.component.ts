import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Barber } from './barber';

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.css']
})
export class BarberComponent implements OnInit {

  constructor(private httpService: HttpClient) { }

  barbers: Barber[] = [];

  ngOnInit(): void {
    this.httpService.get('https://localhost:44396/api/Barber')
    .subscribe(data => { 
      this.barbers = data as Barber[]; 
    });
  }

}

