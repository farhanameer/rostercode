import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckBoxComponent } from './employee-check-box.component';

describe('EmployeeCheckBoxComponent', () => {
  let component: EmployeeCheckBoxComponent;
  let fixture: ComponentFixture<EmployeeCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
