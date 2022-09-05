import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRPortalNMSComponent } from './hr-portal-nms.component';

describe('HRPortalNMSComponent', () => {
  let component: HRPortalNMSComponent;
  let fixture: ComponentFixture<HRPortalNMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRPortalNMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRPortalNMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
