import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {provideIcons} from "@ng-icons/core";
import {featherMenu} from "@ng-icons/feather-icons";
import {heroMoon, heroSun} from "@ng-icons/heroicons/outline";
import {heroBars3Solid, heroXMarkSolid} from "@ng-icons/heroicons/solid";
import {ThemeService} from "../../services/theme.service";
import {Subscription} from "rxjs";
import {SwapComponent} from "../../../shared/components/swap/swap.component";
import {isPlatformBrowser} from "@angular/common";
import {Direction, ParallaxBuilder} from "../../../shared/directives/parallax.directive";
import {Themes} from "../../models/themes";
import {HeaderBackground, HeaderConfig, HeaderService} from "../../services/header.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";

export type HeaderMenu = {
  title: string,
  link: string,
  activateOnScreenId?: string
}

export type InternalHeaderMenu = HeaderMenu & {
  id: number,
  element: HTMLElement,
}

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({featherMenu, heroSun, heroMoon, heroXMarkSolid, heroBars3Solid})]
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {

  private static readonly DEFAULT_MENU: HeaderMenu[] = [
    {title: 'Home', link: '/', activateOnScreenId: 'home'},
    {title: 'About', link: '/', activateOnScreenId: 'about'},
    {title: 'Projects', link: '/', activateOnScreenId: 'projects'},
    {title: 'Contact', link: '/', activateOnScreenId: 'contact'}
  ];

  @ViewChild('themeSwitch') themeSwitch!: SwapComponent;
  @ViewChild('underline') underlineElement!: ElementRef;
  @ViewChild('navbarCenter') navbarCenter!: ElementRef;
  @ViewChildren('menuElement') menuElements!: QueryList<ElementRef>;

  protected headerConfig: HeaderConfig = HeaderService.DEFAULT_CONFIG;

  protected opacityParallax = ParallaxBuilder.fromConfig({
    scrollStart: 0,
    direction: Direction.POSITIVE,
    valueName: 'opacity',
    maxValue: 1,
    position: 'absolute',
    minValue: 0,
    startValue: 0,
    unit: '',
    strength: 0.004,
  });
  private themeIconSubscription!: Subscription;
  private headerSubscription!: Subscription;

  protected screenTop = 0;

  constructor(private themeService: ThemeService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private headerService: HeaderService,
              private router: Router,
              private logger: NGXLogger) {
  }

  initMenuElement(menuElement: EventTarget | null, index: number) {
    if (!(menuElement instanceof HTMLElement)) return;
    this.headerService.headerMenu.push({id: index, element: menuElement, ...this.menu[index]});
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.screenTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  protected get menu(): HeaderMenu[] {
    return HeaderComponent.DEFAULT_MENU
  }

  ngAfterViewInit(): void {
    this.themeIconSubscription = this.themeSwitch
      .subscribeStateChange((state) => {
        this.themeService.switchTheme(state === 'disabled' ? Themes.DARK : Themes.LIGHT);
      });
    this.menuElements.changes.subscribe((data: QueryList<ElementRef>) => {
      data.forEach((element, index) => {
        this.logger.info(`Init menu element: ${element.nativeElement}`);
        this.initMenuElement(element.nativeElement, index);
      });
    });
  }

  ngOnDestroy() {
    this.themeIconSubscription.unsubscribe();
    this.headerSubscription.unsubscribe();
  }

  protected getThemeSwitchIcons(): [string, string] {
    return [heroMoon, heroSun];
  }

  private hoverMenuElement: number | undefined = undefined;
  private activeMenuElement: [EventTarget, number] | undefined = undefined;
  private blockUntil: number | undefined;

  showUnderline(element: EventTarget | null, index: number) {
    if (!(element instanceof HTMLElement)) return;

    this.hoverMenuElement = index;
    const rect = element.getBoundingClientRect();
    const navbarRect = this.navbarCenter.nativeElement.getBoundingClientRect();
    this.underlineElement.nativeElement.style.width = `${rect.width}px`;
    this.underlineElement.nativeElement.style.left = `${rect.left - navbarRect.left + rect.width / 2}px`;
    this.underlineElement.nativeElement.style.transformOrigin = 'center';
  }

  protected scrollToElement(menu: HeaderMenu, event: EventTarget | null, i :number) {

    this.router.navigate([menu.link]).then(() => {
      if (!menu.activateOnScreenId) return;
      const element = document.getElementById(menu.activateOnScreenId);
      if (!element) return;
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      this.blockUntil = i;
      this.activeUnderline(event, i)

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });

  }

  hideUnderline(element: EventTarget | null, index: number) {
    if (!(element instanceof HTMLElement)) return;
    if (this.activeMenuElement && this.activeMenuElement[1] === index) return;

    if (this.hoverMenuElement === index) {
      this.hoverMenuElement = undefined;
    }

    if (!this.activeMenuElement && !this.activeMenuElement) {
      this.underlineElement.nativeElement.style.width = '0';
      return;
    }

    this.showUnderline(this.activeMenuElement[0], this.activeMenuElement[1]);
  }

  public activeUnderline(element: EventTarget | null, index: number) {
    if (!(element instanceof HTMLElement)) return;
    if (this.activeMenuElement && this.activeMenuElement[1] === index) return;

    this.activeMenuElement = [element, index];
    if (!this.activeMenuElement) return;
    this.showUnderline(this.activeMenuElement[0], this.activeMenuElement[1]);
  }

  protected isActive(id: number) {
    if(this.activeMenuElement === undefined) return false;

    return id === this.activeMenuElement[1];
  }

  private deactivateUnderline(element: EventTarget | null, index: number) {
    if (!(element instanceof HTMLElement)) return;
    if (this.activeMenuElement && this.activeMenuElement[1] !== index) return;

    this.activeMenuElement = undefined;
    this.hideUnderline(element, index);
  }

  ngOnInit(): void {
    this.headerSubscription = this.headerService.getConfigObserver().subscribe((config) => {
      if (config.background === HeaderBackground.BLEND_IN_ON_SCROLL) {
        this.onScroll();
      }
      this.headerConfig = config;
    });
    this.headerService.activeMenu.subscribe((menu) => {
      if(this.blockUntil !== undefined) {
        if(menu[1].id !== this.blockUntil) {
          return;
        }
        this.blockUntil = undefined;
      }
      if (menu[0])
        this.activeUnderline(menu[1].element, menu[1].id);
      else
        this.deactivateUnderline(menu[1].element, menu[1].id);
    });
  }

  protected readonly HeaderBackground = HeaderBackground;
}

/**
 * Building Future,
 * Line by Line
 */
