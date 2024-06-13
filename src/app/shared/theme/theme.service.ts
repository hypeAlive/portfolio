import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Themes} from "./Themes";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: Themes = Themes.LARA_DARK_PURPLE;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public switchTheme(theme: Themes) {
    let themeLink = this.document.getElementById('app-theme');
    if(!themeLink) return;

    themeLink.setAttribute('href', theme + ".css");
    this.theme = theme;
  }

  public getTheme() {
    return this.theme;
  }
}
