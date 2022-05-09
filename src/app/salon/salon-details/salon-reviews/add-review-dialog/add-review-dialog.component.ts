import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RegisterRoutingModule } from 'src/app/register/register-routing.module';
import { SalonService } from 'src/app/salon/salon.service';
import { ReviewPost } from '../../review';
import { DialogData } from '../salon-reviews.component';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent implements OnInit {

  newReview: ReviewPost = {
    salonId: this.data.salonId,
    userId: 0,
    text: "",
    rating: 0
  };

  disabled = new FormControl(false);

  selected = 0;

  disabledButton = true;

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private salonService: SalonService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.newReview.userId = parseInt(localStorage.getItem('userId')!);
  }

  addReview(): void {
    this.salonService.addReview(this.newReview).subscribe((review: ReviewPost) => {
      this.alertService.alertSuccess("Review added successfully!");
    });
  }

  checkReview(): void {

    if (this.newReview.text.replace(/ /g, "").length > 10 && this.newReview.rating > 0) {
      this.disabledButton = false;
      return;
    }
    this.disabledButton = true;
  }

}
