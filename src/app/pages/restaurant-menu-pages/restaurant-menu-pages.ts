import { Component, inject, input, OnInit, signal } from '@angular/core';
import { restaurant } from '../../interfaces/restaurante';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/users-service';
import { product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
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
  restaurant: restaurant | undefined;
  categoryService = inject( CategoryService)
  auth = inject(AuthService);
  categories= this.categoryService.categories
  productService= inject(ProductService)
  products= this.productService.products;
   selectedCategoryId = signal<number | null>(null);
   idRestaurant = input<number>();
    

  async ngOnInit(): Promise<void> {
    if (this.restaurantName()) {
      this.cargandoInfo = true
      this.restaurant = this.usersService.restaurants.find(restaurant => restaurant.restaurantName === this.restaurantName());
      if (!this.restaurant){
        await this.usersService.getRestaurants();
        this.restaurant = this.usersService.restaurants.find(restaurant => restaurant.restaurantName === this.restaurantName())!;
      }
      await this.productService.getproductByRestaurant(this.restaurant.id);      
      await this.categoryService.getcategoriesByRestaurant(this.restaurant.id);
      this.cargandoInfo = false;
    }
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
  }

 
   getFilteredProducts(): product[] {
    const selectedId = this.selectedCategoryId();
    if (selectedId === null) {
      return this.products();
    }
    return this.products().filter(p => p.categoryId === selectedId);
  }
}

