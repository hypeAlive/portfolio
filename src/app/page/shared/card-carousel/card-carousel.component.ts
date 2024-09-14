import { Component } from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../card/card.component";

@Component({
  selector: 'card-carousel',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent {

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
