import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';
import { Category } from '../../interfaces/category';
import { product } from '../../interfaces/product';


@Component({
  selector: 'app-menu-user',
  imports: [RouterLink],
  templateUrl: './menu-user.html',
  styleUrl: './menu-user.scss',
})
export class MenuUser {

  categoriesService = inject(CategoryService);
  productsService = inject(ProductService);
  authService = inject(AuthService);
  router = inject(Router);
  Category: Category | undefined;
  Producto: product | undefined;
  isLoading = false;

  ngOnInit(): void {
    const restaurant = this.authService.getUserId();

    if (!restaurant) {
      console.error('No hay restaurante asociado');
      return;
    }

    this.isLoading = true;

    // Cargar categorías
    this.categoriesService.getCategoriesByRestaurantId(restaurant);

    // Cargar productos
    this.productsService.getProductsByRestaurant(restaurant);

    this.isLoading = false;

    console.log('Categorías:', this.categoriesService.categories);
    console.log('Productos:', this.productsService.producto);
  }




  async deleteProduct() {
    const id = this.Producto?.id;
    if (!id) return;

    const res = await this.productsService.deleteProduct(id);
    if (res) {
      this.router.navigate(['/admin']);
    }
  }

  async deleteCategory(id: number) {
  this.isLoading = true;

  const res = await this.categoriesService.deleteCategory(id);

  this.isLoading = false;

  if (res) {
    // Opcional: si el service ya actualiza el array,
    // no hace falta navegar
    this.router.navigate(['/admin']);
  }
}


   }