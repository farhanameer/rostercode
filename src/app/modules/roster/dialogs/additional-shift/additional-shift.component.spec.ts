import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalShiftComponent } from './additional-shift.component';

describe('AdditionalShiftComponent', () => {
  let component: AdditionalShiftComponent;
  let fixture: ComponentFixture<AdditionalShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
