import { Component, inject, input } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-menu-user',
  imports: [ RouterLink],
  templateUrl: './menu-user.html',
  styleUrl: './menu-user.scss',
})
export class MenuUser {
 
  categoriesService = inject(CategoryService);
  productsService = inject(ProductService);
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = false;

  ngOnInit(): void {
    const restaurant = this.authService.getUserId(); 

    if (!restaurant) {
      console.error('No hay restaurante asociado');
      return;
    }

    this.isLoading = true;

    // Cargar categorías
    this.categoriesService.getCategoriesByRestaurant(restaurant);

    // Cargar productos
    this.productsService.getProductsByRestaurant(restaurant);

    this.isLoading = false;

    console.log('Categorías:', this.categoriesService.categories);
    console.log('Productos:', this.productsService.producto);
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id);
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
  }
}
