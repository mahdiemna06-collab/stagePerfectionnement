import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { RendezVousService } from '../../services/rendezvous.service';

import { Client } from '../../models/client.model';
import { RendezVous } from '../../models/rendezvous.model';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-fonction-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fonction-client.html',
  styleUrl: './fonction-client.css',
})
export class FonctionClient {
Number(arg0: string): number {
throw new Error('Method not implemented.');
}

  private router = inject(Router);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);
  private rdvService = inject(RendezVousService);

  currentUser: Client | null = null;

  appointmentDate = '';
  appointmentTime = '';
  appointmentReason = '';

  appointments: Appointment[] = [];

  constructor() {
    this.currentUser = this.clientService.getCurrentUser();
    this.loadAppointments();
  }

  // ================= LOAD =================
  loadAppointments(): void {
    if (!this.currentUser?.id) return;

    this.rdvService.getRendezVousByClient(this.currentUser.id).subscribe({
      next: (rdvs) => {
        this.appointments = rdvs.map(rdv => ({
          id: rdv.id!.toString(),
          date: rdv.dateHeure.split('T')[0],
          time: rdv.dateHeure.split('T')[1]?.substring(0, 5) || '',
          reason: rdv.objet,
          createdAt: new Date(rdv.dateHeure),
          statut: rdv.statut
        }));
      },
      error: err => console.error('Erreur chargement RDV:', err)
    });
  }

  // ================= CREATE =================
  createAppointment(): void {
    if (!this.currentUser?.id) {
      alert('Utilisateur non identifié !');
      return;
    }

    const newRdv: RendezVous = {
      dateHeure: `${this.appointmentDate}T${this.appointmentTime}`,
      objet: this.appointmentReason,
      statut: 'EN_ATTENTE'
    };

    this.rdvService.createRendezVous(this.currentUser.id, newRdv)
      .subscribe({
        next: (data) => {
          alert('Rendez-vous créé !');

          this.appointments.push({
            id: data.id!.toString(),
            date: this.appointmentDate,
            time: this.appointmentTime,
            reason: this.appointmentReason,
            createdAt: new Date(data.dateHeure),
            statut: data.statut
          });

          // reset form
          this.appointmentDate = '';
          this.appointmentTime = '';
          this.appointmentReason = '';
        },
        error: (err) => {
          console.error('Erreur création RDV: ', err);
          alert('Erreur lors de la création du RDV');
        }
      });
  }

  // ================= CANCEL =================
  cancelAppointment(id: number): void {
    this.rdvService.cancelRendezVous(id).subscribe({
      next: (updatedRdv) => {
        const rdv = this.appointments.find(a => a.id === id.toString());
        if (rdv) {
          rdv.statut = updatedRdv.statut;
        }
      },
      error: err => console.error('Erreur annulation RDV:', err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/espace-client']);
  }


  demande(): void{
    this.router.navigate(['/portail-client/demande']);
  }

  trackById(index: number, item: Appointment): string {
    return item.id;
  }
}
