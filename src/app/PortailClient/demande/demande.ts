import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DemandeCredit } from '../../models/demande-credit.model';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demande.html',
  styleUrls: ['./demande.css'],
})
export class Demande implements OnInit {

  private router = inject(Router);
  private http = inject(HttpClient);
  private clientService = inject(ClientService);

  demandes: DemandeCredit[] = [];
currentUser: Client | null = null;

  nouvelleDemande: Partial<DemandeCredit> = {
    montant: 0,
    typeCredit: 'CREDIT_DEPENSES_COURANTES',
    statutCredit: 'EN_ATTENTE'
  };

  loading = false;
  errorMsg = '';

  ngOnInit(): void {
    this.currentUser = this.clientService.getCurrentUser();

     if (!this.currentUser) {
    this.router.navigate(['/espace-client']);
    return;
  }
    this.getDemandes();
  }

 getDemandes() {
  if (!this.currentUser) {
    this.errorMsg = "Utilisateur non connecté.";
    return;
  }

  this.loading = true;

  this.http.get<DemandeCredit[]>(
    `http://localhost:8080/api/demandes/client/${this.currentUser.id}`
  ).subscribe({
    next: data => {
      this.demandes = data;
      this.loading = false;
    },
    error: err => {
      this.errorMsg = 'Impossible de récupérer les demandes';
      this.loading = false;
    }
  });
}


createDemande() {
  if (!this.currentUser) {
    this.errorMsg = "Utilisateur non connecté.";
    return;
  }

  this.errorMsg = '';

  this.http.post<DemandeCredit>(
    `http://localhost:8080/api/demandes/client/${this.currentUser.id}`,
    this.nouvelleDemande
  ).subscribe({
    next: data => {
      this.demandes.push(data);

      this.nouvelleDemande = {
        montant: 0,
        typeCredit: 'CREDIT_DEPENSES_COURANTES',
        statutCredit: 'EN_ATTENTE'
      };
    },
    error: err => {
      console.error(err);
      this.errorMsg = 'Impossible de créer la demande';
    }
  });
}


  retour(): void {
    this.router.navigate(['/portail-client']);
  }
}
