import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeAdjustmentDialog } from './overtime-adjustment.dialog';

describe('OvertimeAdjustmentComponent', () => {
  let component: OvertimeAdjustmentDialog;
  let fixture: ComponentFixture<OvertimeAdjustmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeAdjustmentDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeAdjustmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
