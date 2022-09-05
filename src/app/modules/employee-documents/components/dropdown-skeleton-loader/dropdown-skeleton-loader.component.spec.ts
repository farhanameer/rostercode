import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSkeletonLoaderComponent } from './dropdown-skeleton-loader.component';

describe('DropdownSkeletonLoaderComponent', () => {
  let component: DropdownSkeletonLoaderComponent;
  let fixture: ComponentFixture<DropdownSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownSkeletonLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
