import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeCheckBoxComponent } from './single-employee-check-box.component';

describe('SingleEmployeeCheckBoxComponent', () => {
  let component: SingleEmployeeCheckBoxComponent;
  let fixture: ComponentFixture<SingleEmployeeCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEmployeeCheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmployeeCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
