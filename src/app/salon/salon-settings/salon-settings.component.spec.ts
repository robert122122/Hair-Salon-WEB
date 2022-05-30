import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSettingsComponent } from './salon-settings.component';

describe('SalonSettingsComponent', () => {
  let component: SalonSettingsComponent;
  let fixture: ComponentFixture<SalonSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
