import { Client } from './client.model';

export interface RendezVous {
  id?: number;
  dateHeure: string;   // ISO string
  objet: string;
  statut: string;
  client?: Client;
}
