import { TestBed } from '@angular/core/testing';

import { DocumentmasterService } from './documentmaster.service';

describe('DocumentmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentmasterService = TestBed.get(DocumentmasterService);
    expect(service).toBeTruthy();
  });
});
