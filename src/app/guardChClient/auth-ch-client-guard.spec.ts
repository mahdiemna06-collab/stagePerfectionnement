import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authChClientGuard } from './auth-ch-client-guard';

describe('authChClientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authChClientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
