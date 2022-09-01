import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftAlloctionComponent } from './employee-shift-alloction.component';

describe('EmployeeShiftAlloctionComponent', () => {
  let component: EmployeeShiftAlloctionComponent;
  let fixture: ComponentFixture<EmployeeShiftAlloctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftAlloctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftAlloctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
