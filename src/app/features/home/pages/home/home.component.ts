import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CardComponent, ProjectCard} from "../../components/card/card.component";
import {CardCarouselComponent} from "../../components/card-carousel/card-carousel.component";
import {ContactComponent} from "../../components/contact/contact.component";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {DirectusService} from '../../../../core/services/directus.service';
import {KeyboardComponent} from "../../components/keyboard/keyboard.component";
import {DirectusFile, DirectusTranslation, getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {SectionComponent, SectionWave} from "../../../../shared/components/section/section.component";
import {WaveHandComponent} from "../../components/wave-hand/wave-hand.component";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";
import {
  PointGradientComponent,
  PointImageGradient
} from "../../../../shared/components/point-gradient/point-gradient.component";
import {EmojiBackgroundType, EmojiBlobComponent} from "../../../../shared/components/emoji-blob/emoji-blob.component";
import {EffectColor, getVarFromEffectColor} from "../../../../shared/models/effects.interface";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import {HeaderService} from "../../../../core/services/header.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {ProjectShortCmsResponse} from "../../../../shared/models/project.interface";
import {ProjectService} from "../../../../shared/services/project.service";
import {RainbowTextComponent} from "../../../../shared/components/rainbow-text/rainbow-text.component";

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
    CardCarouselComponent,
    ContactComponent,
    KeyboardComponent,
    NgForOf,
    SectionComponent,
    WaveHandComponent,
    FadeInDirective,
    NgStyle,
    PointGradientComponent,
    NgIf,
    EmojiBlobComponent,
    LottieComponent,
    RainbowTextComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit, AfterViewInit {

  protected projectCards: ProjectCard[] | undefined = undefined;

  @ViewChild('hi') hi!: ElementRef;
  @ViewChildren('menuSection') menuSections!: QueryList<ElementRef>;

  private aboutCms: AboutCmsResponse | undefined = undefined;

  @ViewChild('arrow') arrow!: HTMLCanvasElement;
  private animationItem!: AnimationItem;

  constructor(
    private directus: DirectusService,
    private ngZone: NgZone,
    protected device: DeviceDetectorService,
    private cdr: ChangeDetectorRef,
    private project: ProjectService,
    private headerService: HeaderService) {

  }

  isMobile(): boolean {
    return this.device.isMobile();
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
      })
      .catch((_) => {
      });

    // get project cards from cms
    this.project.getProjectCards().then(cards => {
      this.projectCards = cards;
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
  protected readonly EffectColor = EffectColor;
  protected readonly getVarFromEffectColor = getVarFromEffectColor;

  options: AnimationOptions = {
    path: 'https://cms.nicolasfritz.dev/assets/de75c1ae-f8e7-434c-87e7-4ff3904891c9',
    loop: true,
  };

  playEnter(): void {
    this.animationItem.setSpeed(1);
  }

  playLeave(): void {
    this.animationItem.setSpeed(0.5);
  }

  ngAfterViewInit(): void {
    hljs.registerLanguage('javascript', javascript);
    this.menuSections.forEach((section) => {
      this.registerSectionToHeader(section.nativeElement);
    });
    this.copyCode();
  }

  protected registerSectionToHeader(element: HTMLElement | null){
    if(!element) return;
    this.headerService.registerElement(element);
  }

  private currentCode: string = '';

  private copyCode(): void {
    const highlightedCode = `function build(l = 1) {
    return \`line\${l > 0
      ? ' by ' + build(--l)
      : '.'}\`;
}

console.log(\`... \${build()}\`);`;
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

  protected scrollToHi() {
    this.hi.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  protected readonly EmojiBackgroundType = EmojiBackgroundType;
}
