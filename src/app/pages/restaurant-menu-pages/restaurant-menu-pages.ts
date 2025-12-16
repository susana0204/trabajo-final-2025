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



  async ngOnInit() {
    if (this.restaurantName()) {
      this.cargandoInfo = true
      this.restaurant = this.usersService.users.find(restaurant => restaurant.restaurantName === this.restaurantName());
      console.log('info',this.restaurant)
      if (!this.restaurant) {
          await this.usersService.getRestaurants();
        this.restaurant = this.usersService.users.find(User => User.restaurantName === this.restaurantName())!;
      }
      // Traer datos
        await this.productService.getProductsByRestaurant(this.restaurant.id);
    await this.categoryService.getCategoriesByRestaurantId(this.restaurant.id);
     
      if (this.categories.length > 0) {
        this.selectedCategoryId=(this.categories[0].id);
      }
    }
    this.cargandoInfo = false;
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId=categoryId;
  }


  getFilteredProducts(): product[] {
    
    if (this.selectedCategoryId === null) {
      return this.products;
    }
    return this.products.filter(p => p.categoryId === this.selectedCategoryId);
  }
  getPrice(product: product): number {
    if (!product.discount || product.discount === 0) {
      return product.price
    }
    return product.price - (product.price * (product.discount / 100));
  }

}



