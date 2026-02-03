import { Routes } from '@angular/router';
import { Accueil } from './internaute/accueil/accueil';
import { ContactUs } from './internaute/contact-us/contact-us';
import { EspaceClient } from './internaute/espace-client/espace-client';
import { EspaceChargeClient } from './internaute/espace-charge-client/espace-charge-client';
import { EspaceChargeCredit } from './internaute/espace-charge-credit/espace-charge-credit';
import { NosServices } from './internaute/nos-services/nos-services';
import { UtilisateurDeBanque } from './internaute/utilisateur-de-banque/utilisateur-de-banque';
import { CreerCompte } from './internaute/creer-compte/creer-compte';
import { FonctionClient } from './PortailClient/fonction-client/fonction-client';
import { FonctionChargeClient } from './PortailChargeClient/fonction-charge-client/fonction-charge-client';

import { FonctionChargeCredit } from './PortailChargeCredit/fonction-charge-credit/fonction-charge-credit';
import { EspaceChargeClient as ConnexionChargeClient } from './internaute/espace-charge-client/espace-charge-client';
import { EspaceChargeCredit as ConnexionChargeCredit } from './internaute/espace-charge-credit/espace-charge-credit';
import { authGuard } from './guardClient/auth-guard';
import { Demande } from './PortailClient/demande/demande';
import { ChargeClientGuard } from './guardChClient/auth-ch-client-guard';
import { authChCreditGuard } from './guardChCredit/auth-ch-credit-guard';
export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: Accueil },
  { path: 'contact-us', component: ContactUs },
  { path: 'espace-client', component: EspaceClient },
  { path: 'connexion-client', component: EspaceClient },
  { path: 'portail-client', component: FonctionClient, canActivate:[authGuard] },

  { path: 'portail-client/demande', component: Demande, canActivate:[authGuard] },
  { path: 'nos-services', component: NosServices },
  { path: 'utilisateur-de-banque', component: UtilisateurDeBanque },
  { path: 'espace-charge-client', component: EspaceChargeClient },
  { path: 'connexion-charge-client', component: ConnexionChargeClient },
  { path: 'portail-charge-client', component: FonctionChargeClient, canActivate:[ChargeClientGuard] },
  { path: 'espace-charge-credit', component: EspaceChargeCredit },
  { path: 'connexion-charge-credit', component: ConnexionChargeCredit },
  { path: 'portail-charge-credit', component: FonctionChargeCredit, canActivate:[authChCreditGuard] },
  { path: 'creerCompte', component: CreerCompte },
  { path: '**', redirectTo: 'accueil' },
];
