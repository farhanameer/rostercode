import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftDetailsComponent } from './employee-shift-details.component';

describe('EmployeeShiftDetailsComponent', () => {
  let component: EmployeeShiftDetailsComponent;
  let fixture: ComponentFixture<EmployeeShiftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
