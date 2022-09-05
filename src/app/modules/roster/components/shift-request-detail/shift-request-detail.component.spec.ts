import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRequestDetailComponent } from './shift-request-detail.component';

describe('ShiftRequestDetailComponent', () => {
  let component: ShiftRequestDetailComponent;
  let fixture: ComponentFixture<ShiftRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
