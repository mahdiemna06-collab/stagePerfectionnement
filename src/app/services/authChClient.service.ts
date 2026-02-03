import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  providedIn: 'root'
})
export class AuthChClientService {

  private apiUrl = 'http://localhost:8080/api/personnel';

  private currentUserSubject = new BehaviorSubject<Personnel | null>(this.getInitialUser());
  public currentUser$ = this.currentUserSubject.asObservable();
  private router=inject(Router);

  constructor(private http: HttpClient) {}

  // ================== LOGIN ==================
  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.get<Personnel[]>(this.apiUrl).subscribe(users => {
console.log(JSON.stringify(users, null, 2))
        const user = users.find(u =>
          u.username === username &&
          u.password === password &&
          u.typePersonnel === 'CHARGE_CLIENT'
        );

        if (user) {
          localStorage.setItem('currentChargeClient', JSON.stringify(user));
          this.currentUserSubject.next(user);
          observer.next(true);
          this.router.navigate(['/portail-charge-client']);

        } else {
          observer.next(false);
        }

        observer.complete();
      });
    });
  }

  // ================== LOGOUT ==================
  logout(): void {
    localStorage.removeItem('currentChargeClient');
    this.currentUserSubject.next(null);
  }

  // ================== CURRENT USER ==================
  private getInitialUser(): Personnel | null {
    const storedUser = localStorage.getItem('currentChargeClient');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getCurrentUser(): Personnel | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // ================== GET ALL ==================
  getAllChargeClients(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.apiUrl);
  }
}
