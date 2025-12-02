import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  authService = inject(AuthService);
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/Users";
  readonly API_CATEGORIES_URL = "https://w370351.ferozo.com/api/Categories";
  categories = signal<category[]>([]);


  async getCategoriesByRestaurant(restaurantId: number) {
    const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/categories`);
    if (!res.ok) {
      this.categories.set([]);
      return;
    }
    const data = (await res.json()) as category[];
    this.categories.set(data);
  }
  
}
