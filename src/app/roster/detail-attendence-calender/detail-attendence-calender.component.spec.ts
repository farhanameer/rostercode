import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAttendenceCalenderComponent } from './detail-attendence-calender.component';

describe('DetailAttendenceCalenderComponent', () => {
  let component: DetailAttendenceCalenderComponent;
  let fixture: ComponentFixture<DetailAttendenceCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAttendenceCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAttendenceCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
