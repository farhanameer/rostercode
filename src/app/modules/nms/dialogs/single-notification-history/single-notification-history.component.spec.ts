import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNotificationHistoryComponent } from './single-notification-history.component';

describe('SingleNotificationHistoryComponent', () => {
  let component: SingleNotificationHistoryComponent;
  let fixture: ComponentFixture<SingleNotificationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleNotificationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNotificationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
