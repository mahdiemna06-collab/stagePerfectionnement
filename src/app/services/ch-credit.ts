import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  typePersonnel: string;
  agence?: any;
}
@Injectable({
  providedIn: 'root',
})
export class ChCredit {

  private apiUrl = 'http://localhost:8080/api/personnel';

  private currentUserSubject = new BehaviorSubject<Personnel | null>(this.getInitialUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ===== GET ALL =====
  getAllChargeCredit(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.apiUrl);
  }

  // ===== Current User =====
  private getInitialUser(): Personnel | null {
    const storedUser = localStorage.getItem('currentChargeCredit');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getCurrentUser(): Personnel | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: Personnel): void {
    localStorage.setItem('currentChargeCredit', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentChargeCredit');
    this.currentUserSubject.next(null);
  }

}
