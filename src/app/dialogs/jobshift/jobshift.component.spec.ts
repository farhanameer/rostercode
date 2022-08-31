import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobshiftComponent } from './jobshift.component';

describe('JobshiftComponent', () => {
  let component: JobshiftComponent;
  let fixture: ComponentFixture<JobshiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobshiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
