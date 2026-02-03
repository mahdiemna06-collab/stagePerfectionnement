import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChClient } from '../../services/ch-client';
import { RendezVousService } from '../../services/rendezvous.service';
import { RendezVous } from '../../models/rendezvous.model';
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
  selector: 'app-fonction-charge-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fonction-charge-client.html',
  styleUrl: './fonction-charge-client.css'
})


export class FonctionChargeClient implements OnInit {


  private router = inject(Router);
  private chClientService = inject(ChClient);
  private rdvService = inject(RendezVousService);

  currentUser: Personnel | null = null;
  rendezVousList: RendezVous[] = [];

  ngOnInit(): void {
    this.currentUser = this.chClientService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/espace-charge-client']);
      return;
    }

    this.loadRendezVous();
  }

  loadRendezVous() {
    // si ton backend filtre par client
    this.rdvService.getAllRendezVous().subscribe({
      next: (data) => this.rendezVousList = data,
      error: (err) => console.error('Erreur chargement RDV', err)
    });
  }

  logout() {
    this.chClientService.clearCurrentUser();
    this.router.navigate(['/espace-charge-client']);
  }

  annulerRdv(id: number) {
    this.rdvService.cancelRendezVous(id).subscribe(() => {
      this.loadRendezVous();
    });
  }
}
