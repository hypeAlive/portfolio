import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ThemeService} from "./shared/theme/theme.service";
import {Themes} from "./shared/theme/Themes";
import {HeaderModule} from "./header/header.module";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private themeService: ThemeService) {
  }

  protected toggleTheme() {
    this.themeService.getTheme() === Themes.DARK ? this.themeService.switchTheme(Themes.LIGHT) : this.themeService.switchTheme(Themes.DARK);
  }

}
