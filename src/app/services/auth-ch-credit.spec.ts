import { TestBed } from '@angular/core/testing';

import { AuthChCredit } from './auth-ch-credit';

describe('AuthChCredit', () => {
  let service: AuthChCredit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthChCredit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
