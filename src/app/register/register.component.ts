import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  // your properties and methods here
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = ''; 

  onSubmit() {
    // your submit logic here
    console.log('Form values:', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }
}
