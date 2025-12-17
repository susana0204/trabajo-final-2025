import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/users-service';
import { product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { Category } from '../../interfaces/category';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-restaurant-menu-pages',
  imports: [RouterLink],
  templateUrl: './restaurant-menu-pages.html',
  styleUrl: './restaurant-menu-pages.scss',
})
export class RestaurantMenuPages implements OnInit {
  restaurantName = input.required<string>();
  usersService = inject(UsersService)
  router = inject(Router)
  cargandoInfo = false;
  restaurant: User | undefined;
  categoryService = inject(CategoryService)
  auth = inject(AuthService);
  categories = this.categoryService.categories
  productService = inject(ProductService)
  products =this.productService.producto;
 selectedCategoryId: number | null = null;
  category: Category | undefined;
filteredProducts: product[] = [];


async ngOnInit() {
  this.cargandoInfo = true;

  if (this.restaurantName()) {
    this.restaurant = this.usersService.users
      .find(r => r.restaurantName === this.restaurantName());

    if (!this.restaurant) {
      await this.usersService.getRestaurants();
      this.restaurant = this.usersService.users
        .find(r => r.restaurantName === this.restaurantName())!;
    }

    await this.productService.getProductsByRestaurant(this.restaurant.id);
    await this.categoryService.getCategoriesByRestaurantId(this.restaurant.id);

    // Datos base
    this.products = this.productService.producto;
    this.categories = this.categoryService.categories;

    // Inicializar categoría + filtro
   this.selectedCategoryId = null;
    this.filterProducts();
  }

  this.cargandoInfo = false;
}

selectCategory(categoryId: number|null) {
  this.selectedCategoryId = categoryId;
  this.filterProducts();
}

filterProducts() {
  if (this.selectedCategoryId === null) {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products
      .filter(p => p.categoryId === this.selectedCategoryId);
  }
}
getPrice(product: product): number {
    if (!product.discount || product.discount === 0) {
      return product.price
    }
    return product.price - (product.price * (product.discount / 100));
  }
}