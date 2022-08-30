import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftCardComponent } from './employee-shift-card.component';

describe('EmployeeShiftCardComponent', () => {
  let component: EmployeeShiftCardComponent;
  let fixture: ComponentFixture<EmployeeShiftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
