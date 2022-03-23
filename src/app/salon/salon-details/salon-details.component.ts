import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../salons/salon';
import { SalonService } from '../salon.service';
import { Service } from '../service';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {

  salon: Salon = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "string",
    image: "string",
    address: {
      id: 0,
      country: "",
      city: "",
      street: "",
      number: 0,
    },
    rating: 0,
  };

  images = ["https://images.squarespace-cdn.com/content/v1/5edee990a8696a7b8618fe6d/1592794368345-KP26O2DQ6O0SR8N0KOTN/DomMiguelPhotography6164+copy.jpg?format=2500w", "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFpciUyMHNhbG9ufGVufDB8fDB8fA%3D%3D&w=1000&q=80", "https://www.klaviyo.com/wp-content/uploads/2020/05/Image-from-iOS-2.jpg"];

  services: Service [] = [];

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
  ) { }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.salonService.getSalon(id).subscribe((salon: Salon) => {
      this.salon = salon;
      console.log(salon);
    })

    this.salonService.getServicesBySalon(id).subscribe((services: Service[]) => {
      this.services = services;
      console.log(services);
    })
  }

}
