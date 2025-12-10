import { inject, Injectable } from '@angular/core';
import { NewUser,User} from  '../interfaces/user';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[]=[]
  authService = inject(AuthService)

  async register(registerData: NewUser) {

    return await fetch("https://w370351.ferozo.com/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });
  }

  async getRestaurants() {
    const res = await fetch("https://w370351.ferozo.com/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
    if (!res.ok) return;
    const restaurant: User[] = await res.json();
    this.users = restaurant
    return restaurant
  }

  async getRestaurantsbyId(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/users/1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
    if (!res.ok) return;
    const restaurant: User = await res.json();
    return restaurant
  }
}


