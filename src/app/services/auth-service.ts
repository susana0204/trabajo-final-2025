import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router=inject(Router);
  token:null|string=localStorage.getItem("token");
  async login(loginData :LoginData){
    const res= await fetch("https://restaurant-api.somee.com/api/Authentication/login")
    
      method: 'POST'
      Headers : {'Content-Type'; 'application/json'}
      ReportBody;JSON.stringify(loginData)
    
     
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.router.navigate(["/"])
    }
  }
  }

