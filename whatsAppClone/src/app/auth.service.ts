import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/login/signin', {
      "name": username,
      "password": password,
    }, this.httpOptions);
  }

  register(username: string, password: string, email: string) {
    return this.http.post('http://localhost:3000/login/register', {
      "name": username,
      "password": password,
      "email": email
    }, this.httpOptions);
  }
}
