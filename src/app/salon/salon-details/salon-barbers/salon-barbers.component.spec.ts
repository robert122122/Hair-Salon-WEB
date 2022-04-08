import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonBarbersComponent } from './salon-barbers.component';

describe('SalonBarbersComponent', () => {
  let component: SalonBarbersComponent;
  let fixture: ComponentFixture<SalonBarbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonBarbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonBarbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
