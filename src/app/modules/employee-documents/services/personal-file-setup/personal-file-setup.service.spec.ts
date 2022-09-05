import { TestBed } from '@angular/core/testing';

import { PersonalFileSetupService } from './personal-file-setup.service';

describe('PhysicalLocationSetupService', () => {
  let service: PersonalFileSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalFileSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
