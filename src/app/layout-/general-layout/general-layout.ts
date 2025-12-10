import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-general-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss',
})
export class GeneralLayout {

}
