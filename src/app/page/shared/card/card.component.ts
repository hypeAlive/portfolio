import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  diAngularOriginal,
  diExpressOriginal,
  diJavaOriginal,
  diJavascriptOriginal,
  diPythonOriginal, diTypescriptOriginal
} from "@ng-icons/devicon/original";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {MouseLightEffectDirective} from "../mouse-light-effect.directive";

export enum PROGRAMMING_LANGUAGES {
  ANGULAR = diAngularOriginal,
  JAVA = diJavaOriginal,
  JAVASCRIPT = diJavascriptOriginal,
  TYPESCRIPT = diTypescriptOriginal,
  PYTHON = diPythonOriginal,
  EXPRESS = diExpressOriginal,
}

export type ProjectCard = {
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
    NgOptimizedImage
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
  @Input('card') infos: ProjectCard = {
    title: "Project",
    languages: [],
    description: "Description",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  };

  protected active = false;

  protected getLanguages(): string[] {
    return this.infos.languages as any as string[];
  }


  public activate(): void {
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }


  // card component
  // https://codepen.io/katywellington91/pen/PoGVzwZ

  // carousel
  // https://codepen.io/aybukeceylan/pen/RwrRPoO


}
