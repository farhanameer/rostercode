import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShiftAllocationComponent } from './single-shift-allocation.component';

describe('SingleShiftAllocationComponent', () => {
  let component: SingleShiftAllocationComponent;
  let fixture: ComponentFixture<SingleShiftAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleShiftAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShiftAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
