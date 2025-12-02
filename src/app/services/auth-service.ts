import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  router = inject(Router);
  token: null | string = localStorage.getItem("token");
  async login(loginData: LoginData) {
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });


    if (res.ok) {
      this.token = await res.text()
      localStorage.setItem("token", this.token);
      this.router.navigate(["/"])
    }
  }

  getUserId() {
    return parseInt(this.parseJwt().sub);
  }

  parseJwt () {
    if (!this.token) return;

    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
}


