import { Component, Inject } from '@angular/core';
import { Spinner } from "../../spinner/spinner";
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-login-page',
  imports: [Spinner, RouterModule, FormsModule, MatIcon],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  errorLogin = false;
  authService = Inject(AuthService);
  isLoading = false;

  async login(form:any){
    console.log(form.value)
    this.errorLogin = false;
    if(!form.value.email || !form.value.password){
      this.errorLogin = true;
      return
    }
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
    this.errorLogin = true;

}
}


