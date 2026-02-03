import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthChCredit } from '../../services/auth-ch-credit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-espace-charge-credit',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './espace-charge-credit.html',
  styleUrl: './espace-charge-credit.css',
})
export class EspaceChargeCredit {
   username: string = '';
    password: string = '';
    errorMsg: string = '';

    private router = inject(Router);
    private authservice = inject(AuthChCredit);

    login(): void {
      console.log('Login attempt:', this.username, this.password); // debug TS
      this.authservice.login(this.username, this.password).subscribe({
        next: success => {
          if (success) {
            this.router.navigate(['/portail-charge-credit']);
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
