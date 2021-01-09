import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loggedIn = false;

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

  isLoggedIn() {
    return this.loggedIn;
    console.log(this.loggedIn + "  Methode authService isLoggedIn().");
  }
  setLogin() {
    this.loggedIn = true;
    console.log(this.loggedIn + "  Methode authService setLogin().");
  }
  setLogout() {
    this.loggedIn = false;
    console.log(this.loggedIn + "  Methode authService setLogout().");
  }
}
