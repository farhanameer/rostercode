import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftManagmentDialog } from './employee-shift-managment.dialog';

describe('EmployeeShiftManagmentDialog', () => {
  let component: EmployeeShiftManagmentDialog;
  let fixture: ComponentFixture<EmployeeShiftManagmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftManagmentDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftManagmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
