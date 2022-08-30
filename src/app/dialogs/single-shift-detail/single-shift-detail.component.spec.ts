import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShiftDetailComponent } from './single-shift-detail.component';

describe('SingleShiftDetailComponent', () => {
  let component: SingleShiftDetailComponent;
  let fixture: ComponentFixture<SingleShiftDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleShiftDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShiftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
