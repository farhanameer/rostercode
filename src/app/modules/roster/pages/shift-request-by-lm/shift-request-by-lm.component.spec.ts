import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRequestByLmComponent } from './shift-request-by-lm.component';

describe('ShiftRequestByLmComponent', () => {
  let component: ShiftRequestByLmComponent;
  let fixture: ComponentFixture<ShiftRequestByLmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftRequestByLmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRequestByLmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
