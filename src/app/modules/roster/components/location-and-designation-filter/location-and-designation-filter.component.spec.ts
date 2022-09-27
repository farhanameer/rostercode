import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndDesignationFilterComponent } from './location-and-designation-filter.component';

describe('LocationAndDesignationFilterComponent', () => {
  let component: LocationAndDesignationFilterComponent;
  let fixture: ComponentFixture<LocationAndDesignationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAndDesignationFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAndDesignationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
