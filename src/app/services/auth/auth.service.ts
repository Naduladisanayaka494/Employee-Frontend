import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080'; // Changed to string

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/auth/signup', signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/auth/login', loginRequest);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(BASE_URL + '/api/auth/users');
  }

  signup(userData: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    if (file) {
      formData.append('profilePhoto', file);
    }

    return this.http.post('http://localhost:8080/api/auth/signup', formData);
  }
}
