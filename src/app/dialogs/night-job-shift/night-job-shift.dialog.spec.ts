import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightJobShiftDialog } from './night-job-shift.dialog';

describe('NightJobShiftDialog', () => {
  let component: NightJobShiftDialog;
  let fixture: ComponentFixture<NightJobShiftDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightJobShiftDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightJobShiftDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
