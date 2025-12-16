import { Component, inject, input, viewChild, ɵtriggerResourceLoading } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { FormsModule, NgForm } from '@angular/forms';

import { User } from '../../interfaces/user';


@Component({
  selector: 'app-edituser',
  imports: [FormsModule, RouterModule],
  templateUrl: './edituser.html',
  styleUrl: './edituser.scss',
})
export class Edituser {

  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UsersService);
  form = viewChild<NgForm>('editUserDataForm');
  error: string | null = null;

  userOriginal: User | undefined;
  idUser = input<number>();

  isLoading = false;
  errorBack = false;
  success = false;






  async ngOnInit() {
    if (this.idUser()) {
      this.userOriginal = await this.userService.getRestaurantsbyId(this.idUser()!);

      this.form()?.setValue({
        restaurantName: this.userOriginal!.restaurantName,
        firstName: this.userOriginal!.firstName,
        lastName: this.userOriginal!.lastName,
        address: this.userOriginal!.address,
        phoneNumber: this.userOriginal!.phoneNumber,
        password: this.userOriginal!.password,
        password2: this.userOriginal!.password,
      });
    };
    await this.userService.getRestaurantsbyId(this.idUser()!)
  }

  async handleFormSubmission(form: NgForm) {

    this.errorBack = false;
    const editUSer: User = {
      id: this.userOriginal?.id as number,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password || this.userOriginal?.password,
    };
    let res;
    this.isLoading = true
    if (this.idUser()) {
      res = await this.userService.editUser({ ...editUSer, id: this.idUser()! });
    }
    this.isLoading = false;
    if (!res) {
      this.errorBack = true;
      return
    };
    this.router.navigate(["/"]);

  }

}