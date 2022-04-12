import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from 'src/app/salon/salon.service';
import { ReviewPost } from '../review';
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

  selected = 0;

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: ActivatedRoute,
    private salonService: SalonService,
  ) { }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    console.log(this.data.salonId)

    this.newReview.userId = 2;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addReview(): void {
    this.salonService.addReview(this.newReview).subscribe((review:ReviewPost) => {
      
    });
    console.log(this.newReview);
  }

}
