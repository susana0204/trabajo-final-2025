import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Spinner } from '../../spinner/spinner';
import { UsersService } from '../../services/users-service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, RouterModule, Spinner, MatIcon],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  errorRegister = false;
  isLoading = false;
  router = inject(Router)
  userService = inject(UsersService)



  async register(form: any) {
    this.errorRegister = false;
    if (!form.value.email ||
      !form.value.password ||
      !form.value.password2 ||
      !form.value.firstName ||
      !form.value.lastName ||
      form.value.password !== form.value.password2) {
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res = await this.userService.register(form.value);
    if (res.ok) {
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true;
  }





}
