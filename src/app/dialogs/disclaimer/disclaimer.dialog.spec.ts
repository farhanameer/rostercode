import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerDialog } from './disclaimer.dialog';

describe('DisclaimerComponent', () => {
  let component: DisclaimerDialog;
  let fixture: ComponentFixture<DisclaimerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisclaimerDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
