import { TestBed } from '@angular/core/testing';

import { UserdocumentService } from './userdocument.service';

describe('UserdocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdocumentService = TestBed.get(UserdocumentService);
    expect(service).toBeTruthy();
  });
});
