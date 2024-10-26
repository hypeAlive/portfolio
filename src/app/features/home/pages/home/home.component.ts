import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {CardComponent, ProjectCard} from "../../components/card/card.component";
import {CardCarouselComponent} from "../../components/card-carousel/card-carousel.component";
import {ProjectService} from "../../../project/services/project.service";
import {ContactComponent} from "../../components/contact/contact.component";
import {readItem, readItems} from "@directus/sdk";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {DirectusService} from '../../../../core/services/directus.service';
import {KeyboardComponent} from "../../components/keyboard/keyboard.component";
import {DirectusFile, DirectusTranslation, getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {SectionComponent, SectionWave} from "../../../../shared/components/section/section.component";
import {WaveHandComponent} from "../../components/wave-hand/wave-hand.component";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";
import {
  PointGradientComponent, PointImageGradient
} from "../../../../shared/components/point-gradient/point-gradient.component";
import {EmojiBackgroundType, EmojiBlobComponent} from "../../../../shared/components/emoji-blob/emoji-blob.component";
import {EffectColor, getVarFromEffectColor} from "../../../../shared/models/effects.interface";
import {DotLottie} from "@lottiefiles/dotlottie-web";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

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
    NgStyle,
    PointGradientComponent,
    NgIf,
    EmojiBlobComponent,
    LottieComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit, AfterViewInit {

  protected projectCards: ProjectCard[] | undefined = undefined;

  @ViewChild('hi') hi!: ElementRef;

  private aboutCms: AboutCmsResponse | undefined = undefined;

  @ViewChild('arrow') arrow!: HTMLCanvasElement;
  private animationItem!: AnimationItem;

  constructor(private directus: DirectusService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {

  }

  protected animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    this.animationItem.setSpeed(0.5);
    this.animationItem.play();
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
  protected readonly PointColorGradient = EffectColor;
  protected readonly PointImageGradient = PointImageGradient;
  protected readonly EmojiBackgroundType = EmojiBackgroundType;
  protected readonly EffectColor = EffectColor;
  protected readonly getVarFromEffectColor = getVarFromEffectColor;

  options: AnimationOptions = {
    path: '/assets/arrow5.json',
    loop: true,
  };

  private enter: boolean = false;
  private leave: boolean = false;

  private listener: (() => void) | undefined;

  playEnter(): void {
    this.animationItem.setSpeed(1);
  }

  playLeave(): void {
    this.animationItem.setSpeed(0.5);
  }

  ngAfterViewInit(): void {
    hljs.registerLanguage('javascript', javascript);
    this.copyCode();
  }

  private currentCode: string = '';

  private copyCode(): void {
    const generatedCode = `function build(l = 1) {
    return \`line\${l > 0
      ? ' by ' + build(--l)
      : '.'}\`;
}

console.log(\`... \${build()}\`);`;

    const highlightedCode = generatedCode;
    let currentChar = 0;

    const interval = setInterval(() => {
      if (currentChar < highlightedCode.length) {
        this.currentCode += highlightedCode[currentChar];
        this.hightlightedCode = hljs.highlight(this.currentCode, { language: 'javascript' }).value;
        currentChar++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          this.hightlightedCode = '';
          this.currentCode = '';
          this.copyCode();
        }, 10000);
      }
    }, 100);
  }

protected hightlightedCode: string = '';

protected code: string[] = [];

protected gencode(): string[] {
  return [
    `function build(l = 1) {`,
    `return \`line\${l > 0`,
    `? ' by ' + build(--l)`,
    `: '.'}\`;`,
    `}`,
    ` `,
    `console.log(\`... \${build()}\`);`]
}
  protected scrollToHi() {
    this.hi.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}


// @ts-ignore
function build(l = 1) {
  return `line${l > 0
    ? ' by ' + build(--l)
    : '.'}`;
}

build();
