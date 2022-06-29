import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review, ReviewPost } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpService: HttpClient) { }

  getReviewsBySalon(salonId: number): Observable<Review[]>{
    return this.httpService.get<Review[]>(`https://localhost:44396/api/Review/Salon/${salonId}`);
  }

  addReview(review: ReviewPost): Observable<ReviewPost> {
    return this.httpService.post<ReviewPost>('https://localhost:44396/api/Review', review);
  }
}
