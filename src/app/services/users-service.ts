import { inject, Injectable } from '@angular/core';
import { NewUser, User } from '../interfaces/user';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = []
  authService = inject(AuthService)

  async register(registerData: NewUser) {

    return await fetch("https://w370351.ferozo.com/api/users/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });
  }
  async getRestaurants() {
    const res = await fetch("https://w370351.ferozo.com/api/users/",
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

  async getRestaurantsbyId(id: number|string) {
    const res = await fetch("https://w370351.ferozo.com/api/users/${id}",
      {

        headers: {

          Authorization: "Bearer " + this.authService.token,
        },
      });
     if (!res.ok) {
      return
    }
    return await res.json();
  }


  async editUser(userEditado: User) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${userEditado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.authService.token,
      },
      body: JSON.stringify(userEditado),
    });

    if (!res.ok) return;
    this.users = this.users.map(user => {
      if (user.id === userEditado.id) {
        return userEditado;
      };
      return user;
    });

    return userEditado;
  }
  async deleteUser(id: string | number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + this.authService.token,
      },

    });
    if (!res.ok) return;
    this.users = this.users.filter(user => user.id !== id);
    return true


  }
}