import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShiftAllocationDialog } from './single-shift-allocation.dialog';

describe('SingleShiftAllocationComponent', () => {
  let component: SingleShiftAllocationDialog;
  let fixture: ComponentFixture<SingleShiftAllocationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleShiftAllocationDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShiftAllocationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
