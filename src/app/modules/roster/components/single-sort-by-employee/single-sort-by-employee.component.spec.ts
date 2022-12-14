import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSortByEmployeeComponent } from './single-sort-by-employee.component';

describe('SingleSortByEmployeeComponent', () => {
  let component: SingleSortByEmployeeComponent;
  let fixture: ComponentFixture<SingleSortByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSortByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSortByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
