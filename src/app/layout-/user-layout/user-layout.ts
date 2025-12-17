import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {
  authService = inject(AuthService)

  openLogoutModal() {
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: `Cerrar sesión`
    }).then((result) => {
      if (result.isDenied) {
        this.authService.logout();
      }
    });
  }
}
