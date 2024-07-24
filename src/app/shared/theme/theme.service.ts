import {Inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Themes} from "./Themes";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy{

  private theme: Themes = Themes.DARK;

  private observer: Subject<Themes> = new Subject<Themes>();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }

  public switchTheme(theme: Themes) {

    console.log('switchTheme', theme)
    console.log('this.theme', this.theme)

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
