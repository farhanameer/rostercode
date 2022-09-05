import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFileSetupComponent } from './personal-file-setup.component';

describe('PersonalFileSetupComponent', () => {
  let component: PersonalFileSetupComponent;
  let fixture: ComponentFixture<PersonalFileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalFileSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFileSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
