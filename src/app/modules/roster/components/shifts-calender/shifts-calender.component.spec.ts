import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsCalenderComponent } from './shifts-calender.component';

describe('CheckInOutCalenderComponent', () => {
  let component: ShiftsCalenderComponent;
  let fixture: ComponentFixture<ShiftsCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
