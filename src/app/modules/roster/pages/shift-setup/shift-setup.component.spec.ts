import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSetupComponent } from './shift-setup.component';

describe('ShiftSetupComponent', () => {
  let component: ShiftSetupComponent;
  let fixture: ComponentFixture<ShiftSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
