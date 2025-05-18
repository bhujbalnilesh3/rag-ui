import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      debugger;
      this.isLoading = true;
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      });
    } else {
      this.errorMessage = 'Please fill out all fields.';
    }
  }
}
