import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ChCredit } from '../services/ch-credit';

export const authChCreditGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const chargeCreditService = inject(ChCredit);

  const user = chargeCreditService.getCurrentUser();

  if (user && user.typePersonnel === 'CHARGE_CREDIT') {
    return true;
  }

  // redirection si non autorisé
  return router.parseUrl('/espace-charge-credit');
};
