import {Component, OnInit} from '@angular/core';
import {CardComponent, ProjectCard} from "../../components/card/card.component";
import {CardCarouselComponent} from "../../components/card-carousel/card-carousel.component";
import {ProjectService} from "../../../project/services/project.service";
import {ContactComponent} from "../../components/contact/contact.component";
import {readItem, readItems} from "@directus/sdk";
import {NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {DirectusService} from '../../../../core/services/directus.service';
import {KeyboardComponent} from "../../components/keyboard/keyboard.component";
import {Key, KeyEvent} from "../../models/keyboard-keys";
import {DirectusFile, DirectusTranslation, getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {SectionComponent, SectionWave} from "../../../../shared/components/section/section.component";
import {WaveHandComponent} from "../../components/wave-hand/wave-hand.component";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";

interface AboutCmsResponse {
  worked_at_pictures: DirectusFile[];
  translations: AboutTranslations[];
}

interface ProjectShortCmsResponse {
  id: number;
  is_first: boolean;
  languages: string[];
  translations: ProjectShortTranslation[];
  project_pictures: DirectusFile[];
}

interface ProjectShortTranslation extends DirectusTranslation {
  description_short: string;
  title: string;
}


interface AboutTranslations extends DirectusTranslation {
  hello_title: string;
  worked_at_title: string;
  description: { text: string }[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CardComponent,
    CardCarouselComponent,
    ContactComponent,
    NgOptimizedImage,
    KeyboardComponent,
    NgForOf,
    SectionComponent,
    WaveHandComponent,
    FadeInDirective,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {

  protected projectCards: ProjectCard[] | undefined = undefined;

  private aboutCms: AboutCmsResponse | undefined = undefined;

  constructor(private directus: DirectusService) {

  }

  ngOnInit(): void {
    // get about section data from cms
    this.directus.readItemWithTranslation<AboutCmsResponse>("about", {
      fields: ['*', {translations: ['*'], worked_at_pictures: ['*']}],
    })
      .then((response) => {
        this.aboutCms = response;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    // get project cards from cms
    this.directus.readItemsWithTranslation<ProjectShortCmsResponse>("projects", {
      fields: ['*', {translations: ['*'], project_pictures: ['*']}]
    })
      .then((response) => {
        const cards = response.map((project) => ({
          id: project.id,
          title: project.translations[0].title,
          languages: project.languages,
          description: project.translations[0].description_short,
          imgUrl: project.project_pictures.length >= 1 ? getDirectusFileUrl(project.project_pictures[0].directus_files_id) : ''
        }));

        const sortedCards: typeof cards = [];
        const middleIndex = Math.floor(cards.length / 2);

        cards.forEach((card, index) => {
          const position = index % 2 === 0 ? middleIndex + Math.floor(index / 2) : middleIndex - Math.ceil(index / 2);
          sortedCards[position] = card;
        });

        this.projectCards = sortedCards;
      })
      .catch((error) => {

      });
  }

  protected keyboardEvent(event: KeyEvent): void {
    console.log(event);
  }

  protected get isAboutLoaded(): boolean {
    return !!this.aboutCms;
  }

  protected get helloTitle(): string {
    if (!this.aboutCms) return '';
    return this.aboutCms.translations[0].hello_title;
  }

  protected get descriptions(): { text: string }[] {
    if (!this.aboutCms) return [];
    return this.aboutCms.translations[0].description;
  }

  protected get workedAtTitle(): string {
    if (!this.aboutCms) return '';
    return this.aboutCms.translations[0].worked_at_title;
  }

  protected get workedAtPictures(): DirectusFile[] {
    if (!this.aboutCms) return [];
    return this.aboutCms.worked_at_pictures;
  }

  protected readonly getDirectusFileUrl = getDirectusFileUrl;
  protected readonly SectionWave = SectionWave;
}
