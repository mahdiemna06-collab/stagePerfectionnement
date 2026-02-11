import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-espace-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './espace-client.html',
  styleUrl: './espace-client.css',
})
export class EspaceClient implements OnInit {

  loginForm!: FormGroup;

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (ok) => {
        if (ok) {
          this.router.navigate(['/portail-client']);

        } else {
          alert('Username ou mot de passe incorrect');
        }
      },
      error: (err) => {
        console.error('Erreur login', err);
        alert('Erreur serveur');
      }
    });
  }

  goToCreateAccount(): void {
    this.router.navigate(['/creerCompte']);
  }
}
