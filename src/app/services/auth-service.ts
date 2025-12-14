import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  revisionTokenInterval: number | undefined;
  get token(): string | null {
    return localStorage.getItem("token");
  }
  constructor() {
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken()
    }
  }
  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        const claims = this.parseJwt();
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        }
      }
    }, 600)
  }



  async login(loginData: LoginData) {
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });


    if (res.ok) {
      const obj = await res.json();
      localStorage.setItem("token", obj.token);
      this.router.navigate(["/admin"]);
    }

  }
  logout() {
  localStorage.removeItem("token");
  if (this.revisionTokenInterval) {
    clearInterval(this.revisionTokenInterval);
  }
  this.router.navigate(["/"]);
}


  getUserId() {
    const claims = this.parseJwt();
    return parseInt(claims.sub);
  }

  parseJwt() {
    if (!this.token) return;

    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}


