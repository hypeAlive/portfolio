import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  diAngularOriginal,
  diExpressOriginal,
  diJavaOriginal,
  diJavascriptOriginal,
  diPythonOriginal, diTypescriptOriginal
} from "@ng-icons/devicon/original";
import {NgClass, NgForOf} from "@angular/common";

export enum PROGRAMMING_LANGUAGES {
  ANGULAR = diAngularOriginal,
  JAVA = diJavaOriginal,
  JAVASCRIPT = diJavascriptOriginal,
  TYPESCRIPT = diTypescriptOriginal,
  PYTHON = diPythonOriginal,
  EXPRESS = diExpressOriginal,
}

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [
    NgIcon,
    NgForOf,
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [provideIcons({
    diAngularOriginal,
    diExpressOriginal,
    diJavaOriginal,
    diJavascriptOriginal,
    diPythonOriginal, diTypescriptOriginal
  })]
})
export class CardComponent {
  @Input('languages') languages: PROGRAMMING_LANGUAGES[] = [];

  protected active = false;

  protected getLangauges(): string[] {
    return this.languages as any as string[];
  }

  // card component
  // https://codepen.io/katywellington91/pen/PoGVzwZ

  // carousel
  // https://codepen.io/aybukeceylan/pen/RwrRPoO


}
