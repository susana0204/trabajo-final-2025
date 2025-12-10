import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, ],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {
  authService = inject(AuthService)

}
