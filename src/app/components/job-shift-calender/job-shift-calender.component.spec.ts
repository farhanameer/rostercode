import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShiftCalenderComponent } from './job-shift-calender.component';

describe('JobShiftCalenderComponent', () => {
  let component: JobShiftCalenderComponent;
  let fixture: ComponentFixture<JobShiftCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShiftCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobShiftCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
