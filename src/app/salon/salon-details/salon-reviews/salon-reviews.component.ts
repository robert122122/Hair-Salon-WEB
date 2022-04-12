import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Review } from '../review';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AlertService } from 'src/app/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';

export interface DialogData {
  salonId: number;
  animal: string;
  name: string;
}

@Component({
  selector: 'app-salon-reviews',
  templateUrl: './salon-reviews.component.html',
  styleUrls: ['./salon-reviews.component.css']
})
export class SalonReviewsComponent implements OnInit {

  reviews: Review[] = [];

  animal: string | undefined;
  name: string | undefined;

  salonId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(private route: ActivatedRoute,
    private salonService: SalonService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '40%',
      data: { salonId: this.salonId, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.rating > 0 && result.text.length >= 10) {
        this.reviews.push(result);
      }
    });
  }

  ngOnInit(): void {

    this.salonService.getReviewsBySalon(this.salonId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })
  }

}
