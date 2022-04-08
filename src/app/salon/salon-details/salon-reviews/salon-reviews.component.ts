import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Review } from '../review';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-salon-reviews',
  templateUrl: './salon-reviews.component.html',
  styleUrls: ['./salon-reviews.component.css']
})
export class SalonReviewsComponent implements OnInit {

  reviews: Review[] = [];


  constructor(    private route: ActivatedRoute,
    private salonService: SalonService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,) { }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.salonService.getReviewsBySalon(id).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })
  }

}
