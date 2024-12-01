import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {CoreModule} from "../core.module";
import {RouteConfig} from "../models/RouteConfig";
import {InternalHeaderMenu} from '../components/header/header.component';

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

}
