import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from "primeng/button";
import {ThemeService} from "./shared/theme/theme.service";
import {Themes} from "./shared/theme/Themes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private themeService: ThemeService) {
  }

  protected toggleTheme() {
    this.themeService.getTheme() === Themes.LARA_DARK_PURPLE ? this.themeService.switchTheme(Themes.LARA_LIGHT_PURPLE) : this.themeService.switchTheme(Themes.LARA_DARK_PURPLE);
  }
}
