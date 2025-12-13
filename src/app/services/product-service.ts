import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { DiscountData, HappyHourData, NewProduct, product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authService = inject(AuthService);
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/users";
  readonly API_PRODUCTS_URL = "https://w370351.ferozo.com/api/categories";
  producto: product[] = []


  async getProductsByRestaurant(restaurantId: number) {
    const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/products`);
    if (!res.ok) return;
    const data = await res.json();
    this.producto = data;
  }

  async getProductById(id: string | number) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`);
    if (!res.ok) return undefined;
    return (await res.json()) as product;
  }

  async getMyProduct() {
    const res = await fetch(`${this.API_PRODUCTS_URL}/me`, {
      headers: { Authorization: `Bearer ${this.authService.token}` }
    });

    if (!res.ok) {
      this.producto = [];
      return;
    }

    const data = await res.json();
    this.producto = data;
  }

  async creatProduct(nuevoproducto: NewProduct) {
    const res = await fetch('${API_PRODUCTS_URL}', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(nuevoproducto)
    });
    if (!res.ok) return;
    const resProduct: product = await res.json();
    this.producto.push(resProduct);
    return resProduct;
  }
  async editProduct(productEditado: product) {
    const res = await fetch('${API_PRODUCTS_URL}/${product.id}', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,

      },
      body: JSON.stringify(productEditado)
    });
    if (!res.ok) return;
    this.producto = this.producto.map(product => {
      if (product.id === productEditado.id) {
        return productEditado;
      };
      return productEditado
    }); return productEditado;
  }

  async delateproduct(id: string | number) {
    const res = await fetch('${API_PRODUCTS_URL}/${id}`', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,

      },
    });
    if (!res.ok) return;
    this.producto = this.producto.filter(producto => producto.id !== id);
    return true;
  }
  async setDiscount(id: string | number, discountData: DiscountData) {

    const res = await fetch('${API_PRODUCTS_URL}/${id}/discount', {
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

    const res = await fetch('${API_PRODUCTS_URL}/${id}/happyour', {
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
















































