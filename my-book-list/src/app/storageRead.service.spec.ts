import { TestBed } from '@angular/core/testing';

import { StorageReadService } from './storageRead.service';

describe('StorgeService', () => {
  let service: StorageReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
