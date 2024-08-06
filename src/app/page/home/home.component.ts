import { Component } from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../shared/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
