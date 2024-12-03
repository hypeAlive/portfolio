import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {CoreModule} from "../core.module";
import {RouteConfig} from "../models/RouteConfig";
import {HeaderMenu, InternalHeaderMenu} from '../components/header/header.component';
import {Router} from "@angular/router";

export type HeaderConfig = {
  showMenu: boolean,
  background: HeaderBackground
}

export enum HeaderBackground {
  SHOW = 'show',
  BLEND_IN_ON_SCROLL = 'blend-in-on-scroll',
  HIDE = 'transparent',
}

@Injectable({
  providedIn: CoreModule
})
export class HeaderService extends RouteConfig<HeaderConfig> {

  public static readonly DEFAULT_MENU: HeaderMenu[] = [
    {title: $localize`:@@coreStartPage:Startseite`, link: '/', activateOnScreenId: 'home'},
    {title: $localize`:@@coreAbout:Über mich`, link: '/', activateOnScreenId: 'about'},
    {title: $localize`:@@coreProjects:Projekte`, link: '/', activateOnScreenId: 'projects'},
    {title: $localize`:@@coreContact:Kontakt`, link: '/', activateOnScreenId: 'contact'}
  ];

  public getDefaultMenuById(id: string): HeaderMenu | undefined {
    return HeaderService.DEFAULT_MENU.find(menu => menu.activateOnScreenId === id) || undefined;
  }

  public static readonly DEFAULT_CONFIG: HeaderConfig = {
    showMenu: false,
    background: HeaderBackground.HIDE
  }

  public activeMenu: Subject<[boolean, InternalHeaderMenu]> = new Subject<[boolean, InternalHeaderMenu]>();
  private activeElementsStack: InternalHeaderMenu[] = [];
  private intersectionObserver: IntersectionObserver;

  public headerMenu: InternalHeaderMenu[] = [];

  constructor() {
    super('header', HeaderService.DEFAULT_CONFIG);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const menuItem = this.headerMenu.find(menu => menu.activateOnScreenId === entry.target.id);
        if (menuItem) {
          (entry.target as HTMLElement).dataset['intersectionRatio'] = entry.intersectionRatio.toString();
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({length: 21}, (_, i) => i * 0.05)  // Genauere Schwellenwerte
    });


    this.checkAnimationFrame();
  }

  public registerElement(element: HTMLElement) {
    this.intersectionObserver.observe(element);
  }

  private checkAnimationFrame() {
    requestAnimationFrame(() => {
      const mostVisibleMenu = this.headerMenu
        .filter(menu => menu.activateOnScreenId != null)
        .reduce((prev, current) => {
          const prevRatio = parseFloat(document.getElementById(prev.activateOnScreenId!)?.dataset['intersectionRatio'] ?? '0');
          const currRatio = parseFloat(document.getElementById(current.activateOnScreenId!)?.dataset['intersectionRatio'] ?? '0');
          return currRatio > prevRatio ? current : prev;
        }, this.headerMenu[0]);

      if (this.activeElementsStack[0] !== mostVisibleMenu) {
        this.activeElementsStack = [mostVisibleMenu];
        this.activeMenu.next([true, mostVisibleMenu]);
      }

      this.checkAnimationFrame();
    });
  }

  public async scrollToElement(menu: HeaderMenu) {
    const currentUrl = this.router.url;
    const targetUrl = this.router.createUrlTree([menu.link]).toString();

    const isSameUrl = currentUrl === targetUrl;

    if (!isSameUrl) {
      if (menu.activateOnScreenId === 'home') {
        return this.router.navigate([menu.link], {queryParams: {id: 'home'}}).then(() => {
          setTimeout(() => {
            this.router.navigate([menu.link], {queryParams: {id: null}, queryParamsHandling: 'merge'});
          }, 50);
        });
      }
    }

    return this.router.navigate([menu.link]).then(() => {
      setTimeout(() => {
        if (!menu.activateOnScreenId) return;
        const element = document.getElementById(menu.activateOnScreenId);
        if (!element) return;
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        console.log(offsetPosition);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, isSameUrl ? 0 : 100);



    });
  }


}
