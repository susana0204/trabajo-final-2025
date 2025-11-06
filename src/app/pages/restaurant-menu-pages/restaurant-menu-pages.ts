import { Component, inject, input, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { restaurant } from '../../interfaces/restaurante';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-restaurant-menu-pages',
  imports: [MatIcon],
  templateUrl: './restaurant-menu-pages.html',
  styleUrl: './restaurant-menu-pages.scss',
})
export class RestaurantMenuPages implements OnInit {
  restaurantName = input.required<string>();

  auth = inject(AuthService);

  ngOnInit(): void {
    const userId = this.auth.getUserId();
  }
}
