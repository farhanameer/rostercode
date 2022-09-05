import { TestBed } from '@angular/core/testing';

import { AddDocumentService } from './add-document.service';

describe('AddDocumentService', () => {
  let service: AddDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
