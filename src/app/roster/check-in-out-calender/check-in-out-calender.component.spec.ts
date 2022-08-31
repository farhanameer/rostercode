import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutCalenderComponent } from './check-in-out-calender.component';

describe('CheckInOutCalenderComponent', () => {
  let component: CheckInOutCalenderComponent;
  let fixture: ComponentFixture<CheckInOutCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
