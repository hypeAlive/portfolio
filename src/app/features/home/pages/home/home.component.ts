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

interface AboutCmsResponse {
  worked_at_pictures: DirectusFile[];
  translations: AboutTranslations[];
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

    console.log(this.directus.getLocale())
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

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
  protected readonly getDirectusFileUrl = getDirectusFileUrl;
  protected readonly SectionWave = SectionWave;
}
