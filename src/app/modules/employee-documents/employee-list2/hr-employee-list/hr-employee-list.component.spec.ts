import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeListComponent } from './hr-employee-list.component';

describe('HrEmployeeListComponent', () => {
  let component: HrEmployeeListComponent;
  let fixture: ComponentFixture<HrEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
