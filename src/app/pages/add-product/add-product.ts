import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Spinner } from "../../spinner/spinner";
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NewProduct, product } from '../../interfaces/product';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { UsersService } from '../../services/users-service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-add-product',
  imports: [Spinner, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  categories: Category[] = []
  router = inject(Router)
  idProduct = input<number>();
  form = viewChild<NgForm>('newProductForm');
  isloading = false;
  errorEnBack = false;
  productoOriginal : product | undefined;
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  productService = inject(ProductService);
  restaurantService = inject(UsersService)

  
  async ngOnInit() {
    if (this.idProduct()) {
      this.productoOriginal = await this.productService.getProductById(this.idProduct()!);
      this.form()?.setValue({
        name: this.productoOriginal!.name,
        description: this.productoOriginal!.description,
        price: this.productoOriginal!.price,
        featured: this.productoOriginal!.featured,
        recommendedFor: this.productoOriginal!.recommendedFor,
        discount: this.productoOriginal!.discount,
        hasHappyHour: this.productoOriginal!.hashappyhour,
        categoryId: this.productoOriginal!.categoryId,
        

      })
    }
    await this.categoryService.getCategoriesByRestaurantId(this.authService.getUserId());

  }
  async handleFormsubmission(form: NgForm) {
    this.errorEnBack = false;

    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: Number(form.value.price),
      featured: !!form.value.featured,
      discount: Number(form.value.discount ?? 0),
      hashappyhour: !!form.value.hasHappyHour,
      categoryId: Number(form.value.categoryId),
      restaurantId: this.authService.getUserId()!,
      recommendedFor: form.value.reconmmendedFor
    };
    console.log(nuevoProducto)
    let res;

    this.isloading = true;

    if (this.idProduct()) {
      res = await this.productService.editProduct({
        ...nuevoProducto,
        id: this.idProduct()!
      });
    } else {
      res = await this.productService.createProduct(nuevoProducto);
    }

    this.isloading = false;

    if (!res) {
      this.errorEnBack = true;
      return;
    };
    this.router.navigate(['/admin']);
  }
}











