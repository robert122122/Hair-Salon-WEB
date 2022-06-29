import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Service } from './service';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-salon-services',
  templateUrl: './salon-services.component.html',
  styleUrls: ['./salon-services.component.css']
})
export class SalonServicesComponent implements OnInit {


  services: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
    private serviceService: ServiceService,
    ) { }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.serviceService.getServicesBySalon(id).subscribe((services: Service[]) => {
      this.services = services;
    })
  }

}
