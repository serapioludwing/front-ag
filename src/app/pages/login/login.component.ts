import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Credenciales incorrectas';
      }
    });
  }
}
