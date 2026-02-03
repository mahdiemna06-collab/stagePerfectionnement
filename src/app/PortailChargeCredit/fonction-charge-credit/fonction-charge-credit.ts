import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChCredit } from '../../services/ch-credit';
import { DemandeService } from '../../services/demande.service';
import { DemandeCredit } from '../../models/demande-credit.model';
interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  typePersonnel: string;
  agence?: any;
}
@Component({
  selector: 'app-fonction-charge-credit',
  imports: [CommonModule],
  templateUrl: './fonction-charge-credit.html',
  styleUrl: './fonction-charge-credit.css',
})
export class FonctionChargeCredit implements OnInit {


  private router = inject(Router);
  private chCreditService = inject(ChCredit);
  private demandeService = inject(DemandeService);

  currentUser: Personnel | null = null;
  demandesList: DemandeCredit[] = [];
  ngOnInit(): void {
    this.currentUser = this.chCreditService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/espace-charge-credit']);
      return;
    }

    this.loadDemandes();
  }

loadDemandes() {
  this.demandeService.getAllDemandes().subscribe({
    next: (data) => {
      console.log('Données reçues du backend :', data); // <-- ajoute ce log
      this.demandesList = data;
    },
    error: (err) => console.error('Erreur chargement demandes', err)
  });
}


  logout() {
    this.chCreditService.clearCurrentUser();
    this.router.navigate(['/espace-charge-credit']);
  }
  approuverDemande(id: number) {
  this.demandeService.approveDemande(id).subscribe({
    next: () => {
      console.log('Demande approuvée');
      this.loadDemandes(); // refresh
    },
    error: err => console.error('Erreur approbation', err)
  });
}

refuserDemande(id: number) {
  this.demandeService.refuseDemande(id).subscribe({
    next: () => {
      console.log('Demande refusée');
      this.loadDemandes();
    },
    error: err => console.error('Erreur refus', err)
  });
}



}
