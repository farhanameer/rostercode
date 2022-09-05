import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListHostComponent } from './employee-list-host.component';

describe('EmployeeListHostComponent', () => {
  let component: EmployeeListHostComponent;
  let fixture: ComponentFixture<EmployeeListHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
