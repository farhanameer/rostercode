import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningJobShiftDialog } from './morning-job-shift.dialog';

describe('MorningJobShiftDialog', () => {
  let component: MorningJobShiftDialog;
  let fixture: ComponentFixture<MorningJobShiftDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorningJobShiftDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MorningJobShiftDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
