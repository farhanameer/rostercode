import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderSetupComponent } from './calender-setup.component';

describe('CalenderSetupComponent', () => {
  let component: CalenderSetupComponent;
  let fixture: ComponentFixture<CalenderSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
