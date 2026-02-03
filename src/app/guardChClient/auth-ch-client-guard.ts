import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ChClient } from '../services/ch-client';

@Injectable({
  providedIn: 'root'
})
export class ChargeClientGuard implements CanActivate {

  private router = inject(Router);
  private Chargeclientservice=inject(ChClient)

  canActivate(): boolean {
    const user = this.Chargeclientservice.getCurrentUser();

    if (user && user.typePersonnel === 'CHARGE_CLIENT') {
      return true;
    }

    this.router.navigate(['/espace-charge-client']);
    return false;
  }
}
