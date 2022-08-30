import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShiftDetailComponent } from './job-shift-detail.component';

describe('JobShiftDetailComponent', () => {
  let component: JobShiftDetailComponent;
  let fixture: ComponentFixture<JobShiftDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShiftDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobShiftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
