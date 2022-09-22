import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkWeekendComponent } from './mark-weekend.component';

describe('MarkWeekendComponent', () => {
  let component: MarkWeekendComponent;
  let fixture: ComponentFixture<MarkWeekendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkWeekendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
