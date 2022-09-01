import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRequestApprovalComponent } from './shift-request-approval.component';

describe('ShiftRequestApprovalComponent', () => {
  let component: ShiftRequestApprovalComponent;
  let fixture: ComponentFixture<ShiftRequestApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftRequestApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
