import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { restaurant } from '../interfaces/restaurante';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  authService = inject(AuthService)
  aleatorio = Math.random()
  readonly URL_BASE = 'https://w370351.ferozo.com/api/'
  restaurants: restaurant[] = []

  async getCateoriesOfUser(userId: number) {

    const res = await fetch(this.URL_BASE + "/users/" + userId + "/categories",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: restaurant[] = await res.json()
    this.restaurants = resJson;

  }
 
  
}
