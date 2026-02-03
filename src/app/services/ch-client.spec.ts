import { TestBed } from '@angular/core/testing';

import { ChClient } from './ch-client';

describe('ChClient', () => {
  let service: ChClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
