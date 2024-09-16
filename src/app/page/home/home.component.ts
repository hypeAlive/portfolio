import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../shared/card/card.component";
import {CardCarouselComponent} from "../shared/card-carousel/card-carousel.component";
import {ProjectService} from "../shared/project.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CardCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private project: ProjectService) {

  }

  ngOnInit(): void {
    this.project.testing(false);
  }

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
