import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftManagmentComponent } from './shift-managment.component';

describe('ShiftManagmentComponent', () => {
  let component: ShiftManagmentComponent;
  let fixture: ComponentFixture<ShiftManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
