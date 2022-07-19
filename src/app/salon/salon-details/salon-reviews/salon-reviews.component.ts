import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../../salon.service';
import { Review } from './review';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { DatePipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from 'src/app/alert.service';
import { ReviewService } from './review.service';


export interface DialogData {
  salonId: number;
}

@Component({
  selector: 'app-salon-reviews',
  templateUrl: './salon-reviews.component.html',
  styleUrls: ['./salon-reviews.component.css']
})
export class SalonReviewsComponent implements OnInit {

  reviews: Review[] = [];

  value = '';

  userRole: string = '';

  mobWidth: any;


  sortingOptions = ["DateAdded Asc", "DateAdded Desc", "Rating Asc", "Rating Desc"];

  selectedSort: any;

  salonId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  pipe = new DatePipe('en-US');

  constructor(private route: ActivatedRoute,
    private salonService: SalonService,
    private jwtHelper: JwtHelperService,
    private reviewService: ReviewService,
    private alertService: AlertService,
    public dialog: MatDialog) {
    this.mobWidth = (window.screen.width) + "px";
  }

  openDialog(): void {
    if (this.userRole == 'User') {
      let dialogRef = this.dialog.open(AddReviewDialogComponent, {
        width: this.mobWidth,
        data: { salonId: this.salonId },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.rating > 0 && result.text.length >= 10) {
          this.reviewService.getReviewsBySalon(this.salonId).subscribe((reviews: Review[]) => {
            this.reviews = reviews;
          })
        }
      });
    }
    else if (this.userRole == 'Salon') {
      this.alertService.alertWarning("You need to login as a user!");
    }

  }

  ngOnInit(): void {

    this.reviewService.getReviewsBySalon(this.salonId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })

    const token = localStorage.getItem("jwt");
    const decode = this.jwtHelper.decodeToken(token!);
    let str;
    const newObj = {} as any;
    for (let prop in decode) {
      const val = decode[prop];
      if (prop.includes('/')) {
        str = prop.substring(prop.lastIndexOf('/') + 1, prop.length);
      }
      else {
        str = prop;
      }
      newObj[str] = val;
    }

    this.userRole = newObj.role;

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
