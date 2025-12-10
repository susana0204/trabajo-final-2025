import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-menu-user',
  imports: [],
  templateUrl: './menu-user.html',
  styleUrl: './menu-user.scss',
})
export class MenuUser {
  restaurant : User| undefined;

}
