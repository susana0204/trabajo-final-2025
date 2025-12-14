import { Component, inject, input, viewChild, ɵtriggerResourceLoading } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { FormsModule, NgForm } from '@angular/forms';

import { User } from '../../interfaces/user';


@Component({
  selector: 'app-edituser',
  imports: [FormsModule,RouterModule],
  templateUrl: './edituser.html',
  styleUrl: './edituser.scss',
})
export class Edituser {
[x: string]: any;

  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UsersService);
  editUserform = viewChild<NgForm>('editUserDataForm');

  userOriginal: User | undefined = undefined;
  idUser = input<number>();

  isLoading = false;
  errorBack = false;
  success = false;
  error: string | null = null;



  async ngOnInit() {
    if (this.idUser()){
    this.userOriginal = await this.userService.getRestaurantsbyId(this.idUser()!);

    this.editUserform()?.setValue({
      restaurantName: this.userOriginal!.restaurantName,
      firstName: this.userOriginal!.firstName,
      lastName: this.userOriginal!.lastName,
      address: this.userOriginal!.address,
      phoneNumber: this.userOriginal!.phoneNumber,
      password: this.userOriginal!.password,
      password2: this.userOriginal!.password,
    });
};
  }

  async handleFormSubmission(form: NgForm) {
    if (!this.userOriginal) return;//Asegurá que userOriginal exista ANTES|👉 
    // Ahora TypeScript sabe que userOriginal existe|👉 No necesitás ? ni as number


    const userEditado: User = {
      id: this.userOriginal.id,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      password: form.value.password,
      phoneNumber: form.value.phoneNumber,
    };

    const res = await this.userService.editUser(userEditado);

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return;
    }

    this.success = true;
    this.router.navigate(['/']);
  }
}
