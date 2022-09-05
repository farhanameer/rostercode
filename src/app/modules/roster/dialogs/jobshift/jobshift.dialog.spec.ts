import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobshiftDialog } from './jobshift.dialog';

describe('JobshiftDialog', () => {
  let component: JobshiftDialog;
  let fixture: ComponentFixture<JobshiftDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobshiftDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobshiftDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
