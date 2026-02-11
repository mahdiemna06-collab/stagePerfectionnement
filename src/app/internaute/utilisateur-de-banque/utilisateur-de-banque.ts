import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-utilisateur-de-banque',
  standalone:true,
  imports: [RouterLinkActive, RouterLink],
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

