import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Barber } from '../../barber';
import { SalonService } from '../../salon.service';

@Component({
  selector: 'app-salon-barbers',
  templateUrl: './salon-barbers.component.html',
  styleUrls: ['./salon-barbers.component.css']
})
export class SalonBarbersComponent implements OnInit {

  barbers: Barber[] = [];

  constructor(private route: ActivatedRoute,
    private salonService: SalonService,) { }

  ngOnInit(): void {


    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.salonService.getBarbersBySalon(id).subscribe((barbers: Barber[]) => {
      this.barbers = barbers;
    })
  }

}
