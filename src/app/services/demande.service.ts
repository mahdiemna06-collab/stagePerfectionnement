import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeCredit } from '../models/demande-credit.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8080/api/demandes';

  constructor(private http: HttpClient) {}

  getDemandesByClient(clientId: number): Observable<DemandeCredit[]> {
    return this.http.get<DemandeCredit[]>(`${this.apiUrl}/client/${clientId}`);
  }

  createdemande(clientId: number, d: DemandeCredit): Observable<DemandeCredit> {
    return this.http.post<DemandeCredit>(`${this.apiUrl}/client/${clientId}`, d);
  }
  getAllDemandes(): Observable<DemandeCredit[]> {
      return this.http.get<DemandeCredit[]>(this.apiUrl);
  }
  approveDemande(id: number): Observable<DemandeCredit> {
  return this.http.put<DemandeCredit>(
    `${this.apiUrl}/approve/${id}`,
    {}
  );
}

refuseDemande(id: number): Observable<DemandeCredit> {
  return this.http.put<DemandeCredit>(
    `${this.apiUrl}/refuse/${id}`,
    {}
  );
}


}
