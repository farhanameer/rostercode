import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeHoursAdjusmentDialog } from './overtime-hours-adjusment.dialog';

describe('OvertimeHoursAdjusmentDialog', () => {
  let component: OvertimeHoursAdjusmentDialog;
  let fixture: ComponentFixture<OvertimeHoursAdjusmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeHoursAdjusmentDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeHoursAdjusmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
