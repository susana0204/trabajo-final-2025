import { Component, inject, input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { restaurant } from '../../interfaces/restaurante';
import { CategoryService } from '../../services/category-service';
import Swal from 'sweetalert2';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-restaurant-list-page',
  imports: [FormsModule, RouterLink, RouterLink, MatIcon],
  templateUrl: './restaurant-list-page.html',
  styleUrl: './restaurant-list-page.scss',
})
export class RestaurantListPage {
  restaurant = input.required<restaurant>()
  aleatorio = Math.random()
  categoryService = inject(CategoryService)
  router = inject(Router)

  viewMenu() {
    Swal.fire({

      title: " ¿Desea ver el menu?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Sí, ver menú",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/restaurant-menu', '0']);
        this.categoryService.getCateoriesOfUser(0);
      }
    });
  }}

