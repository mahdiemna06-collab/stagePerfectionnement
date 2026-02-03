import { Agence } from "./agence.model";
export interface Client {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  gouvernorat: string;
  gender: string;
  nationalite: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  occupation: string;
  agence?: Agence | null;
}
