import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCheckBoxComponent } from './date-check-box.component';

describe('DateCheckBoxComponent', () => {
  let component: DateCheckBoxComponent;
  let fixture: ComponentFixture<DateCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateCheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
