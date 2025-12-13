import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Spinner } from "../../spinner/spinner";
import { FormsModule, NgForm } from '@angular/forms';
import { Category, NewCategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  imports: [Spinner,FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory  implements OnInit{
  router = inject(Router)
  idCategory = input<number>();
  form = viewChild<NgForm>('newCategoryForm');
  isloading = false;
  errorEnBack = false;
  categoryOrignal: Category | undefined = undefined;
  categoryService = inject(CategoryService);
  authService = inject(AuthService);

async ngOnInit(){

const allCategories = this.categoryService.categories;
this.categoryOrignal = allCategories.find( category=> category.id == this.idCategory());
 if (this.categoryOrignal){
  this.form()?.setValue({
    name: this .categoryOrignal.name,
  });}
  else{
    await  this.categoryService.getCategoriesByRestaurant(this.authService.getUserId());
    const freshcategories = this.categoryService.categories;
    this.categoryOrignal = freshcategories.find( category=> category.id == this.idCategory())
  }
 }


 async handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    const nuevoCategory: NewCategory = {
      name:form.value.name,
      restaurantId:this.authService.getUserId()
    }

      let res;
   
    this.isloading = true;
    if(this.idCategory()){
      res = await this.categoryService.editCategory({...nuevoCategory,id:this.idCategory()!})
    } else {
      res = await this.categoryService.creatCategory(nuevoCategory);
    }
    this.isloading = false;
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/",res.id]);
  }


}

 
