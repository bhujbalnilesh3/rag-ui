import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent]
})
export class RegisterComponent {
  // your properties and methods here
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // your submit logic here
    console.log('Form values:', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });

    this.isLoading = true;

    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Registration successful! Click OK to go to the login page.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        alert(`Registration failed: ${err.message || 'Unknown error'}`);
        console.error('Registration error:', err);
      }
    });
  }
}
