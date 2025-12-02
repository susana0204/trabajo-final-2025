import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authService = inject(AuthService);
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/users";
  readonly API_PRODUCTS_URL = "https://w370351.ferozo.com/api/categories";
  products = signal<product[]>([]);


   async getProductsByRestaurant(restaurantId: number) {
    const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/products`);
    if (!res.ok) return;
    const data = await res.json();
    this.products.set(data);
  }

  async getProductById(id: string | number) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`);
    if (!res.ok) return undefined;
    return (await res.json()) as product;
  }

    
  }

















































