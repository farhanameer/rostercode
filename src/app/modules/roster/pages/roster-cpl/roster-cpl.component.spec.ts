import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCplComponent } from './roster-cpl.component';

describe('RosterCplComponent', () => {
  let component: RosterCplComponent;
  let fixture: ComponentFixture<RosterCplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterCplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
