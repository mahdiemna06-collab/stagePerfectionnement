import { TestBed } from '@angular/core/testing';

import { ChCredit } from './ch-credit';

describe('ChCredit', () => {
  let service: ChCredit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChCredit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
