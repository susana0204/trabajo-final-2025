import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { DiscountData, HappyHourData, NewProduct, product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {
  

  authService = inject(AuthService);

  readonly API_USERS_URL = 'https://w370351.ferozo.com/api/users';
  readonly API_PRODUCTS_URL = 'https://w370351.ferozo.com/api/products/';

  producto: product[] = [];

  async getProductsByRestaurant(restaurantId: number) {
    const res = await fetch(
      `https://w370351.ferozo.com/api/users/${restaurantId}/products`,
    );

    if (!res.ok) {
      this.producto = [];
      return;
    }

    this.producto = await res.json();
  }

  async getProductById(id: number| string) {
  const res = await fetch(`https://w370351.ferozo.com/api/users/${id}/products`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
     if(!res.ok) return;
    const resproduct:product = await res.json();
    return resproduct;
  }

  async createProduct(nuevoProducto: NewProduct) {
    const res = await fetch('https://w370351.ferozo.com/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevoProducto),
    });

   
    if (!res.ok) return ;

    const resproduct = await res.json();
    this.producto.push(resproduct);
    return resproduct;
  }

  async editProduct(productEditado: product): Promise<product | null> {
  const res = await fetch(
    `https://w370351.ferozo.com/api/products/${productEditado.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(productEditado),
    }
  );

  if (!res.ok) return null;

  const productoActualizado: product = await res.json();

  this.producto = this.producto.map(product =>
    product.id === productoActualizado.id
      ? productoActualizado
      : product
  );

  return productoActualizado;
}


  async deleteProduct(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
         'Content-Type': 'application/json',
      },
    });

    if (!res.ok) return ;

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





















































