import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliableShiftDialog } from './avaliable-shift.dialog';

describe('AvaliableShiftComponent', () => {
  let component: AvaliableShiftDialog;
  let fixture: ComponentFixture<AvaliableShiftDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliableShiftDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliableShiftDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
