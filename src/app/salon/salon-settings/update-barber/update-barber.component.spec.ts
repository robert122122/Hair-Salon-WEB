import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBarberComponent } from './update-barber.component';

describe('UpdateBarberComponent', () => {
  let component: UpdateBarberComponent;
  let fixture: ComponentFixture<UpdateBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
