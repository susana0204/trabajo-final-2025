import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { DiscountData, HappyHourData, NewProduct, product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {
  

  authService = inject(AuthService);

  readonly API_USERS_URL = 'https://w370351.ferozo.com/api/users';
  readonly API_PRODUCTS_URL = 'https://w370351.ferozo.com/api/products';

  producto: product[] = [];

  async getProductsByRestaurant(restaurantId: number) {
    const res = await fetch(
      `${this.API_USERS_URL}/${restaurantId}/products`
    );

    if (!res.ok) {
      this.producto = [];
      return;
    }

    this.producto = await res.json();
  }

  async getProductById(id: number) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async createProduct(nuevoProducto: NewProduct) {
    const res = await fetch(`${this.API_PRODUCTS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (!res.ok) return undefined;

    const product = await res.json();
    this.producto.push(product);
    return product;
  }

  async editProduct(productEditado: product) {
    const res = await fetch(
      `${this.API_PRODUCTS_URL}/${productEditado.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(productEditado),
      }
    );

    if (!res.ok) return undefined;

    this.producto = this.producto.map(p =>
      p.id === productEditado.id ? productEditado : p
    );

    return productEditado;
  }

  async deleteProduct(id: number) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
         'Content-Type': 'application/json',
      },
    });

    if (!res.ok) return false;

    this.producto = this.producto.filter(p => p.id !== id);
    return true;
  }

    async setDiscount(id: string | number, discountData: DiscountData) {

    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}/discount`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,

      },
      body: JSON.stringify(discountData)
    });
    return res.ok
  }
  
  async setHappyHour(id: string | number, happyhour: HappyHourData) {

    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}/happyHour`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,

      },
      body: JSON.stringify(happyhour)
    });
    return res.ok
}
}





















































