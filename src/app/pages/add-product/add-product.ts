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
  imports: [Spinner,FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  categories: Category[] = []
  router = inject(Router)
  idproduct = input<number>();
  form = viewChild<NgForm>('newProductForm');
  isloading = false;
  errorEnBack = false;
  productoOrignal: product | undefined = undefined;
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  productService = inject(ProductService);
  restaurantService = inject(UsersService)
  async ngOnInit() {

    const allCategories = this.categoryService.categories;
    if (this.idproduct()) {
      this.productoOrignal = await this.productService.getProductById(this.idproduct()!)
      this.form()?.setValue({
        name: this.productoOrignal!.name,
        description: this.productoOrignal!.description,
        price: this.productoOrignal!.price,
        hashappyhour: this.productoOrignal!.hashappyhour,
        discount: this.productoOrignal!.discount,
        featured: this.productoOrignal!.featured,
        reconmmendedFor: this.productoOrignal!.recommendedFor,

      })
    }
    await this.categoryService.getCategoriesByRestaurant(this.authService.getUserId())
  }
  async handleFormsubmission(form:NgForm){
    this.errorEnBack = false;
    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: Number(form.value.price),
      featured: !!form.value.featured,
      recommendedFor: Number(form.value.recommendedFor),
      discount: Number(form.value.discount ?? 0),
      hashappyhour: !!form.value.hasHappyHour,
      categoryId: Number(form.value.categoryId),
      restaurantId: 0
    };
      let res;
   
    this.isloading = true;
    if(this.idproduct()){
      res = await this.productService.editProduct({...nuevoProducto,id:this.idproduct()!})
    } else {
      res = await this.productService.createProduct(nuevoProducto);
    }
    this.isloading = false;
    if(!res) {
      this.errorEnBack = true;
      return
    };




    }
  }












