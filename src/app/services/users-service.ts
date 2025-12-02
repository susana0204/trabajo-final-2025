import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/user';
import { restaurant } from '../interfaces/restaurante';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  restaurants: restaurant[] = [];

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
    const restaurant: restaurant[] = await res.json();
    this.restaurants = restaurant
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
    const restaurant: restaurant = await res.json();
    return restaurant
  }
}


