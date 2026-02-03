import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authChCreditGuard } from './auth-ch-credit-guard';

describe('authChCreditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authChCreditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
