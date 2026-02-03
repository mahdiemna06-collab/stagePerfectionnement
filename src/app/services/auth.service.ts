import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from '../models/client.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentClient: Client | null = null;

private clientService = inject(ClientService);
  login(username: string, password: string): Observable<boolean> {
    return this.clientService.getAll().pipe(
      map((clients: Client[]) => {
        const client = clients.find(
          c => c.username === username && c.password === password
        );

        if (client) {
          this.currentClient = client;
          localStorage.setItem('state', 'connected');
          localStorage.setItem('role', 'client');
          localStorage.setItem('currentUser', JSON.stringify(client));
          return true;
        }

        return false;
      })
    );
  }

  logout(): void {
    this.currentClient = null;
    localStorage.removeItem('state');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('state') === 'connected';
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getCurrentClient(): Client | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
