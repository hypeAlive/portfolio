import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../../components/card/card.component";
import {CardCarouselComponent} from "../../components/card-carousel/card-carousel.component";
import {ProjectService} from "../../../project/services/project.service";
import {ContactComponent} from "../../components/contact/contact.component";
import {readItems} from "@directus/sdk";
import {NgOptimizedImage} from "@angular/common";
import { DirectusService } from '../../../../core/services/directus.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CardComponent,
    CardCarouselComponent,
    ContactComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {

  protected projectCards: ProjectCard[] | undefined = undefined;

  constructor(private directus: DirectusService) {

  }

  ngOnInit(): void {
    this.directus.getRestClient().request(readItems("projects")).then(async (response) => {
      console.log(response);
    });
  }

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
