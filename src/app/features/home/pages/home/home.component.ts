import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../../components/card/card.component";
import {CardCarouselComponent} from "../../components/card-carousel/card-carousel.component";
import {ProjectService} from "../../../project/services/project.service";
import {ContactComponent} from "../../components/contact/contact.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CardComponent,
    CardCarouselComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {

  protected projectCards: ProjectCard[] | undefined = undefined;

  constructor(private project: ProjectService) {

  }

  ngOnInit(): void {
    this.project.getProjectCards()
      .then(cards => this.projectCards = cards);
  }

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
