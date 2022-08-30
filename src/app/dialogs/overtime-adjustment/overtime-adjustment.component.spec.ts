import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeAdjustmentComponent } from './overtime-adjustment.component';

describe('OvertimeAdjustmentComponent', () => {
  let component: OvertimeAdjustmentComponent;
  let fixture: ComponentFixture<OvertimeAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
