import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthChClientService } from '../../services/authChClient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-espace-charge-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './espace-charge-client.html',
  styleUrls: ['./espace-charge-client.css'], // corrigé
})
export class EspaceChargeClient {
  username: string = '';
  password: string = '';
  errorMsg: string = '';

  private router = inject(Router);
  private authservice = inject(AuthChClientService);

  login(): void {
    console.log('Login attempt:', this.username, this.password); // debug TS
    this.authservice.login(this.username, this.password).subscribe({
      next: success => {
        if (success) {
          this.router.navigate(['/portail-chargeclient']);
        } else {
          this.errorMsg = 'Username ou mot de passe incorrect';
        }
      },
      error: err => {
        console.error('Erreur login:', err);
        this.errorMsg = 'Erreur serveur, réessayez plus tard';
      }
    });
  }

  retour(): void {
    this.router.navigate(['/utilisateur-de-banque']);
  }
}
