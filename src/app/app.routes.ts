import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent  } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatbotComponent },
  { path: '**', redirectTo: '/login' }
];
