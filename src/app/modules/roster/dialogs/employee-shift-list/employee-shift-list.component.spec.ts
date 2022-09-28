import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftListComponent } from './employee-shift-list.component';

describe('EmployeeShiftListComponent', () => {
  let component: EmployeeShiftListComponent;
  let fixture: ComponentFixture<EmployeeShiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
