import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendTypeComponent } from './weekend-type.component';

describe('WeekendTypeComponent', () => {
  let component: WeekendTypeComponent;
  let fixture: ComponentFixture<WeekendTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekendTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
