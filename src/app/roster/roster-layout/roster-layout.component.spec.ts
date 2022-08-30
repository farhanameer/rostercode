import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterLayoutComponent } from './roster-layout.component';

describe('RosterLayoutComponent', () => {
  let component: RosterLayoutComponent;
  let fixture: ComponentFixture<RosterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
