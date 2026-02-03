import { Client } from "./client.model";
export interface DemandeCredit {
  id: number;
  montant: number;
  typeCredit: string;
  statutCredit: string;
  client: Client;
}
