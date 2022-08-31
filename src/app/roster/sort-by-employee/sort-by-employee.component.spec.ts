import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByEmployeeComponent } from './sort-by-employee.component';

describe('SortByEmployeeComponent', () => {
  let component: SortByEmployeeComponent;
  let fixture: ComponentFixture<SortByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
