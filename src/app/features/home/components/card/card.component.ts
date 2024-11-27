import {Component, Input, OnInit} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  diAngularOriginal,
  diExpressOriginal,
  diJavaOriginal,
  diJavascriptOriginal,
  diPythonOriginal,
  diTypescriptOriginal
} from "@ng-icons/devicon/original";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MouseLightEffectDirective} from "../../../../shared/directives/mouse-light-effect.directive";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {
  PointGradientComponent
} from "../../../../shared/components/point-gradient/point-gradient.component";
import {EffectColor} from "../../../../shared/models/effects.interface";

export type ProjectCard = {
  id: number;
  title: string;
  languages: string[];
  description: string;
  imgUrl: string;
  url: string;
}

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [
    NgIcon,
    NgForOf,
    NgClass,
    MouseLightEffectDirective,
    NgOptimizedImage,
    NgIf,
    PointGradientComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [provideIcons({
    diAngularOriginal,
    diExpressOriginal,
    diJavaOriginal,
    diJavascriptOriginal,
    diPythonOriginal,
    diTypescriptOriginal
  })]
})
export class CardComponent implements OnInit{
  @Input('card') infos: ProjectCard | undefined = undefined;
  @Input('preActivate') preActivate = false;

  constructor(private logger: NGXLogger, private router: Router) {
  }

  protected active = false;

  protected getLanguages(): string[] {
    return this.infos?.languages as any as string[];
  }


  public activate(): void {
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }

  protected isLoaded(): boolean {
    return this.infos !== undefined;
  }

  protected navigateToProject(): void {
    if(!this.infos) {
      this.logger.error('No infos to navigate to project');
      return;
    }
    this.router.navigate(['project', this.infos.url]).then();
  }

  ngOnInit(): void {
    if(this.preActivate) {
      this.activate();
    }
  }


  protected readonly PointColorGradient = EffectColor;
}
