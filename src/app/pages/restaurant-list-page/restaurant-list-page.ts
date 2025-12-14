import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CategoryService } from '../../services/category-service';
import { MatIcon } from "@angular/material/icon";
import { UsersService } from '../../services/users-service';
import { RestaurantMenuPages } from "../restaurant-menu-pages/restaurant-menu-pages";


@Component({
  selector: 'app-restaurant-list-page',
  imports: [FormsModule, MatIcon],
  templateUrl: './restaurant-list-page.html',
  styleUrl: './restaurant-list-page.scss',
})
export class RestaurantListPage implements OnInit {
  aleatorio = Math.random()
  categoryService = inject(CategoryService)
  router = inject(Router)
  usersService =  inject(UsersService)
 
  
  ngOnInit(): void {
    this.usersService.getRestaurants;
  }

  viewMenu(restaurantName: string) {
  this.router.navigate(['/restaurant-menu', restaurantName]);
}

  }

