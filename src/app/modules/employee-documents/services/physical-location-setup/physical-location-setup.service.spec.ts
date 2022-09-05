import { TestBed } from '@angular/core/testing';

import { PhysicalLocationSetupService } from './physical-location-setup.service';

describe('PhysicalLocationSetupService', () => {
  let service: PhysicalLocationSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalLocationSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
