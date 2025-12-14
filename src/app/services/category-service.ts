import { inject, Injectable,  } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory } from '../interfaces/category';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  authService = inject(AuthService);
 readonly API_USERS_URL = 'https://w370351.ferozo.com/api/users';
  readonly API_CATEGORIES_URL = 'https://w370351.ferozo.com/api/categories/';


  categories: Category[] = []


  async getCategoriesByRestaurant(restaurantId: number) {
    const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/categories`);
    if (!res.ok) {
      this.categories.length = 0;
      return;
    }
    const data = await res.json();

    this.categories.length = 0;
    this.categories.push(...data);
  }



  async creatCategory(nuevocategory: NewCategory) {
    const res = await fetch(`${this.API_CATEGORIES_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(nuevocategory)
    });
    if (!res.ok) return;
    const resCategory: Category = await res.json();
    this.categories.push(resCategory);
    return resCategory;

  }
  


  async editCategory(categoryEditado: Category) {
    const res = await fetch(`${this.API_CATEGORIES_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,

      },
      body: JSON.stringify(categoryEditado)
    });
    if (!res.ok) return;
    this.categories = this.categories.map(category => {
      if (category.id === categoryEditado.id) {
        return categoryEditado;
      };
      return category
    }); return categoryEditado;
  }

  async deleteCategory(id: string | number) {
    const res = await fetch(`${this.API_CATEGORIES_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + this.authService.token,
         'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return;
    this.categories = this.categories.filter(category => category.id !== id);
    return true;


  }


















}



