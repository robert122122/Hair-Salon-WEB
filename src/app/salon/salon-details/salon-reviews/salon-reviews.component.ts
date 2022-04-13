import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Review } from '../review';

import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { DatePipe } from '@angular/common';

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

  value = '';

  sortingOptions = ["DateAdded Asc", "DateAdded Desc", "Rating Asc", "Rating Desc"];

  selectedSort: any;

  salonId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  pipe = new DatePipe('en-US');

  constructor(private route: ActivatedRoute,
    private salonService: SalonService,
    public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '40%',
      data: { salonId: this.salonId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.rating > 0 && result.text.length >= 10) {
        this.salonService.getReviewsBySalon(this.salonId).subscribe((reviews: Review[]) => {
          this.reviews = reviews;
        })
      }
    });
  }

  ngOnInit(): void {

    this.salonService.getReviewsBySalon(this.salonId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })

  }

  formatDate(date: Date): string | null {
    return this.pipe.transform(date, 'MMMM d, y, h:mm:ss a');
  }

  sortSalons(option: string): any {
    return this.reviews.sort((obj1, obj2) => {
      this.selectedSort = option;
      if (option.includes("Asc")) {
        if (option.includes("DateAdded")) {
          if (obj1.dateAdded > obj2.dateAdded) {
            return 1;
          }

          if (obj1.dateAdded < obj2.dateAdded) {
            return -1;
          }

          return 0;
        }

        else {
          if (obj1.rating > obj2.rating) {
            return 1;
          }

          if (obj1.rating < obj2.rating) {
            return -1;
          }

          return 0;
        }
      }

      else {
        if (option.includes("DateAdded")) {
          if (obj1.dateAdded > obj2.dateAdded) {
            return -1;
          }

          if (obj1.dateAdded < obj2.dateAdded) {
            return 1;
          }

          return 0;
        }

        else {
          if (obj1.rating > obj2.rating) {
            return -1;
          }

          if (obj1.rating < obj2.rating) {
            return 1;
          }

          return 0;
        }
      }
    })
  }
}
