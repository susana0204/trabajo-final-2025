import { inject, Injectable, } from '@angular/core';
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


  async getCategoriesByRestaurantId(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${id}/categories`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const data = await res.json();

    this.categories.length = 0;
    this.categories.push(...data);
  }



  async creatCategory(nuevocategory: NewCategory) {
    const res = await fetch('https://w370351.ferozo.com/api/categories', {
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



  async editCategory(categoryEditado: Category): Promise<Category | null> {
    const res = await fetch(
      `https://w370351.ferozo.com/api/categories/${categoryEditado.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(categoryEditado),
      }
    );

    if (!res.ok) return null;

    const categoryActualizada: Category = await res.json();

    this.categories = this.categories.map(category =>
      category.id === categoryActualizada.id
        ? categoryActualizada
        : category
    );

    return categoryActualizada;
  }




  async deleteCategory(id: number | number) {
    const res = await fetch(
      `https://w370351.ferozo.com/api/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      }
    );

    if (!res.ok) return false;
    this.categories = this.categories.filter(cat => cat.id !== id);
    return true;
  }


}
