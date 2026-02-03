import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous.model';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private apiUrl = 'http://localhost:8080/api/rdvs';

  constructor(private http: HttpClient) { }

getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  getRendezVousByClient(clientId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/client/${clientId}`);
  }

  createRendezVous(clientId: number, rdv: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.apiUrl}/client/${clientId}`, rdv);
  }

  cancelRendezVous(id: number): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/annuler/${id}`, {});
  }
}
