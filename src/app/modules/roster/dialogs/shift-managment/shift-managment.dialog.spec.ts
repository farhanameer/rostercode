import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftManagmentDialog } from './shift-managment.dialog';

describe('ShiftManagmentDialog', () => {
  let component: ShiftManagmentDialog;
  let fixture: ComponentFixture<ShiftManagmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftManagmentDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftManagmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
