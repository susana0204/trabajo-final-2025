import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { restaurant } from '../../interfaces/restaurante';

@Component({
  selector: 'app-restaurant-menu-pages',
  imports: [MatIcon],
  templateUrl: './restaurant-menu-pages.html',
  styleUrl: './restaurant-menu-pages.scss',
})
export class RestaurantMenuPages {
   idRestaurant = input.required<restaurant>()
}
