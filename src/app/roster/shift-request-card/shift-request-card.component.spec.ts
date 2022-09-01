import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRequestCardComponent } from './shift-request-card.component';

describe('ShiftRequestCardComponent', () => {
  let component: ShiftRequestCardComponent;
  let fixture: ComponentFixture<ShiftRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
