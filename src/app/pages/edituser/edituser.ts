import { Component, inject, input, viewChild, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './edituser.html',
  styleUrl: './edituser.scss'
})
export class Edituser implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UsersService);
  editUserform = viewChild<NgForm>('editUserDataForm');

  idUser = input<number>(); // Si recibes ID por input

  isLoading = false;
  errorBack = false;
  success = false;

  userData: any = {
    id: null,
    restaurantName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: '',
    password2: '' // Para el campo repetir
  };

  async ngOnInit() {
  
    let id = this.idUser(); 
    if (!id) id = this.authService.getUserId();


    if (id) {
      this.isLoading = true;
      try {
        const respuesta: any = await this.userService.getRestaurantsbyId(id);
        console.log("📦 Respuesta Backend:", respuesta);

        
        let user: any = null;
        if (Array.isArray(respuesta)) {
          user = respuesta.length > 0 ? respuesta[0] : null;
        } else {
          user = respuesta;
        }

        
        if (user) {
          this.userData = {
            id: user.id,
            restaurantName: user.restaurantName,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            password: user.password,
            password2: user.password 
          };
        }

      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.success = false;
    this.errorBack = false;

   
    const userEditado = { ...this.userData };

    try {
      const res = await this.userService.editUser(userEditado); 
      if (res) {
        this.success = true;
         this.router.navigate(['/admin']);

      } else {
        this.errorBack = true;
      }
    } catch (error) {
      this.errorBack = true;
    } finally {
      this.isLoading = false;
    }
  }
}