import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { restaurant } from '../interfaces/restaurante';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  authService = inject(AuthService)
  aleatorio = Math.random()
  readonly URL_BASE = 'https://w370351.ferozo.com/swagger/index.html'
  restaurants: restaurant[] = []
  async getRestaurant(id: any) {

    const res = await fetch(this.URL_BASE,
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
