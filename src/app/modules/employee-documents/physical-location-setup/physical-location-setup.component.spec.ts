import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalLocationSetupComponent } from './physical-location-setup.component';

describe('PhysicalLocationSetupComponent', () => {
  let component: PhysicalLocationSetupComponent;
  let fixture: ComponentFixture<PhysicalLocationSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalLocationSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalLocationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
