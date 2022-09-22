import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutCalendarComponent } from './check-in-out-calendar.component';

describe('CheckInOutCalendarComponent', () => {
  let component: CheckInOutCalendarComponent;
  let fixture: ComponentFixture<CheckInOutCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
