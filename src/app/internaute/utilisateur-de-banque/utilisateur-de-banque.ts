import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardInternaute } from "../dashboard-internaute/dashboard-internaute";

@Component({
  selector: 'app-utilisateur-de-banque',
  standalone:true,
  imports: [DashboardInternaute],
  templateUrl: './utilisateur-de-banque.html',
  styleUrl: './utilisateur-de-banque.css',
})
export class UtilisateurDeBanque {
  private router = inject(Router);

  navigateToChargeClient() {
    this.router.navigate(['/espace-charge-client']);
  }

  navigateToChargeCredit() {
    this.router.navigate(['/espace-charge-credit']);
  }
}

