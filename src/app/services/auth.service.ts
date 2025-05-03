import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE_URL = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${BASE_URL}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${BASE_URL}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
