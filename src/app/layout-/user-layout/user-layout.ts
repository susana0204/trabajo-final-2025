import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {
  authService = inject(AuthService)

}
