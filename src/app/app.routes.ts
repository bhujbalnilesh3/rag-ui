import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent  } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatbotComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
