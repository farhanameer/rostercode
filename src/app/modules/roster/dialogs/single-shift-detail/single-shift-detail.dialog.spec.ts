import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShiftDetailDialog } from './single-shift-detail.dialog';

describe('SingleShiftDetailDialog', () => {
  let component: SingleShiftDetailDialog;
  let fixture: ComponentFixture<SingleShiftDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleShiftDetailDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShiftDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
