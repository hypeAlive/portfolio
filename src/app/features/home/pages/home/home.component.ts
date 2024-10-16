import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../../components/card/card.component";
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

interface WorkedWithData {
  pictures: DirectusFile[];
  translations: WorkedWithTranslations[];
}

interface WorkedWithTranslations extends DirectusTranslation {
  title: string;
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

  private workedWithData: WorkedWithData | undefined = undefined;

  constructor(private directus: DirectusService) {

  }

  ngOnInit(): void {
    this.directus.getRestClient().request(readItems("projects", {
      deep: {
        translations: {
          _filter: {
            languages_code: {_eq: this.directus.getLocale()},
          },
        },
      },
      fields: ['translations', {translations: ['title']}]
    })).then(async (response) => {
      console.log(response);
    });

    this.directus.readItemWithTranslation<WorkedWithData>("worked_with", {
      fields: ['*', {translations: ['*'], pictures: ['*']}],
    })
      .then((response) => {
        this.workedWithData = response;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(this.directus.getLocale())
  }

  protected keyboardEvent(event: KeyEvent): void {
    console.log(event);
  }

  protected get workedWithTitle(): string {
    if (!this.workedWithData) return '';
    return this.workedWithData.translations[0].title;
  }

  protected get workedWithPictures(): DirectusFile[] {
    if (!this.workedWithData) return [];
    return this.workedWithData.pictures;
  }

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
  protected readonly getDirectusFileUrl = getDirectusFileUrl;
  protected readonly SectionWave = SectionWave;
}
