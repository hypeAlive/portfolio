import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subject, Subscription} from "rxjs";
import {Themes} from "../models/themes";
import {CoreModule} from "../core.module";
import theme from "tailwindcss/defaultTheme";

@Injectable({
  providedIn: CoreModule
})
export class ThemeService implements OnDestroy {

  private theme: Themes = Themes.DARK;

  private observer: Subject<Themes> = new Subject<Themes>();

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }

  public switchTheme(theme: Themes) {
    const themeLink = this.document.getElementById('app-theme');
    if (!themeLink) return;

    themeLink.setAttribute('data-theme', theme);
    themeLink.classList.toggle('dark', theme === Themes.DARK);

    this.theme = theme;
    this.observer.next(theme);
  }

  public getTheme() {
    return this.theme;
  }

  public subscribe(observer: (theme: Themes) => void): Subscription {
    return this.observer.subscribe(observer);
  }

}
