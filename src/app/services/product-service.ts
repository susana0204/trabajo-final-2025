import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authService = inject(AuthService);
  readonly API_Restaurants_URL = "https://w370351.ferozo.com/api/Users";
  readonly API_Product_URL = "https://w370351.ferozo.com/api/Categories";
  products = signal<product[]>([]);


  async getproductByRestaurant(restaurantId: number) {

    const res = await fetch('${this.API_USERS_URL}/${restaurantId}/products')
    if (!res.ok) return;

    const data = (await res.json()) as product[];
    this.products.set(data);
  }
  async getProductById(id: string | number) {
    const res = await fetch(`${this.API_Product_URL}/${id}`);
    if (!res.ok) return undefined;
    return (await res.json()) as product;
  }

















































}
