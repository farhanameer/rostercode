import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRecieversPopupComponent } from './notification-recievers-popup.component';

describe('NotificationRecieversPopupComponent', () => {
  let component: NotificationRecieversPopupComponent;
  let fixture: ComponentFixture<NotificationRecieversPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationRecieversPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRecieversPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
