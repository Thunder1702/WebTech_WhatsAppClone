import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/login/signin', {
      username: username,
      password: password,
    });
  }
  register(username: string, password: string, email: string) {
    return this.http.post('http://localhost:3000/login/register', {
      username: username,
      password: password,
      email: email,
    });
  }
}
