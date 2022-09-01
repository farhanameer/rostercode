import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftManagementDialog } from './employee-shift-management.dialog';

describe('EmployeeShiftManagementDialog', () => {
  let component: EmployeeShiftManagementDialog;
  let fixture: ComponentFixture<EmployeeShiftManagementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftManagementDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftManagementDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
