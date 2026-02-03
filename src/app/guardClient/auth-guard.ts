import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const stateConnexion = localStorage.getItem('state');

  if (stateConnexion === 'connected') {
    return true;
  } else {
    router.navigate(['/espace-client']);
    return false;
  }
};
