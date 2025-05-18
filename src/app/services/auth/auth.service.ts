import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    const apiUrl = `${environment.apiBaseUrl}/users/login`;

    return this.http.post<any>(apiUrl, body, { headers }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.error || 'Login failed'));
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(username: string, email: string, password: string, role: string): Observable<any> {
    const body = { username, email, password, role };
    const apiUrl = `${environment.apiBaseUrl}/users/register`;
    return this.http.post(apiUrl, body);
  }
}
