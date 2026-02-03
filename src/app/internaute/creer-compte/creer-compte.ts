import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { Agence } from '../../models/agence.model';
import { Gender, Gouvernorat, Nationalite } from '../../enum/enums';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.html',
  styleUrls: ['./creer-compte.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreerCompte implements OnInit {

  genders = Object.values(Gender);
  gouvernorats = Object.values(Gouvernorat);
  nationalites = Object.values(Nationalite);

  agences: Agence[] = [
    {
      "id": 1,
      "nom": "Agence de l'Ariana",
      "adresse": "Centre Urbain Nord"
    },
    {
      "id": 2,
      "nom": "Agence de Gafsa ville",
      "adresse": "Avenue de l'indépendance"
    },
    {
      "id": 3,
      "nom": "Agence de Manzel Abd Rahmen",
      "adresse": "Avenue de l'environnement"
    },
    {
      "id": 6,
      "nom": "Agence Siège",
      "adresse": "Avenue Habib Bourguiba"
    }

  ];

  client: Client = {
    nom: '',
    prenom: '',
    username: '',
    password: '',
    email: '',
    telephone: '',
    cin: '',
    gender: Gender.HOMME,
    gouvernorat: Gouvernorat.TUNIS,
    nationalite: Nationalite.TUNISIENNE,
    dateNaissance: '',
    occupation: '',
    agence: this.agences[0]
  };

  private clientService = inject(ClientService);
  private router = inject(Router);

  ngOnInit(): void { }

  onSubmit() {
    console.log('Client envoyé:', this.client);
    this.clientService.create(this.client).subscribe({
      next: (res) => {
        console.log('Client créé avec succès', res);
        alert('Compte créé !');
        this.router.navigate(['/portail-client']);
      },
      error: (err) => {
        console.error('Erreur création client:', err);
        alert('Erreur lors de la création du compte. Vérifiez les champs.');
      }
    });
  }
  retour(): void {
    this.router.navigate(['/espace-client']);
  }
}
