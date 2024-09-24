import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  diAngularOriginal,
  diExpressOriginal,
  diJavaOriginal,
  diJavascriptOriginal,
  diPythonOriginal, diTypescriptOriginal
} from "@ng-icons/devicon/original";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MouseLightEffectDirective} from "../../../../shared/directives/mouse-light-effect.directive";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";

export enum PROGRAMMING_LANGUAGES {
  ANGULAR = diAngularOriginal,
  JAVA = diJavaOriginal,
  JAVASCRIPT = diJavascriptOriginal,
  TYPESCRIPT = diTypescriptOriginal,
  PYTHON = diPythonOriginal,
  EXPRESS = diExpressOriginal,
}

export type ProjectCard = {
  id: number;
  title: string;
  languages: PROGRAMMING_LANGUAGES[];
  description: string;
  imgUrl: string;
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
    NgIf
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
export class CardComponent {
  @Input('card') infos: ProjectCard | undefined = undefined;

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
    this.router.navigate(['project'], {
      queryParams: {id: this.infos?.id},
      state: {data: this.infos}
    })
      .catch(err => {
        this.logger.error('Error while navigating to project:', err);
      });
  }


}
