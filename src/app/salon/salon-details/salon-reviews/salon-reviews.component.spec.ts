import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonReviewsComponent } from './salon-reviews.component';

describe('SalonReviewsComponent', () => {
  let component: SalonReviewsComponent;
  let fixture: ComponentFixture<SalonReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
