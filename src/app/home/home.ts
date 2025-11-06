import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink } from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import { UsersService } from '../services/users-service';
@Component({
  selector: 'app-home',
  imports: [RouterLink ,MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HOME {
usersService =  inject(UsersService)
 
}
