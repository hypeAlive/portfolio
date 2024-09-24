import {Inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subject, Subscription} from "rxjs";
import {CoreModule} from "../core.module";
import {Themes} from "../models/themes";

@Injectable({
  providedIn: CoreModule
})
export class ThemeService implements OnDestroy{

  private theme: Themes = Themes.DARK;

  private observer: Subject<Themes> = new Subject<Themes>();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }

  public switchTheme(theme: Themes) {

    let themeLink = this.document.getElementById('app-theme');
    if(!themeLink) return;

    themeLink.setAttribute('data-theme', theme);
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
