import { Component, inject, viewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-setting',
  imports: [FormsModule, RouterLink],
  templateUrl: './setting.html',
  styleUrl: './setting.scss',
})
export class Setting {
  usersService = inject(UsersService);
  authService = inject(AuthService);
  router = inject(Router);
  id = this.authService.getUserId()
  user: User | undefined ;
  cargando = false;
  error = '';
  showDeleteConfirm = false;
  isDeleting = false;

  async ngOnInit() {
    const loggedUserId = this.authService.getUserId();
    console.log(loggedUserId);
    if (loggedUserId) {
      this.cargando = true;
      const res = await this.usersService.getRestaurantsbyId(this.id);
      this.cargando = false;
      this.user = res;
    }
  }






  openDeleteModal() {
    Swal.fire({
      title: "¿Querés borrar tu cuenta permanentemente?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: "Borrar",
    }).then((result) => {
      if (result.isDenied && this.id) {

        this.usersService.deleteUser(this.id).then(() => { Swal.fire("Usuario eliminado con éxito"); });
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}