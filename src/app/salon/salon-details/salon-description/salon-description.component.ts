import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Salon } from '../../salons/salon';

@Component({
  selector: 'app-salon-description',
  templateUrl: './salon-description.component.html',
  styleUrls: ['./salon-description.component.css']
})
export class SalonDescriptionComponent implements OnInit {

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
    description: "",
    logo: ""
  };

  constructor(    private route: ActivatedRoute,
    private salonService: SalonService,) { }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    
    this.salonService.getSalon(id).subscribe((salon: Salon) => {
      this.salon = salon;
    })
  }

}
