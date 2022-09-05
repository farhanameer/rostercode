import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMPortalNMSComponent } from './lm-portal-nms.component';

describe('LMPortalNMSComponent', () => {
  let component: LMPortalNMSComponent;
  let fixture: ComponentFixture<LMPortalNMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LMPortalNMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LMPortalNMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
