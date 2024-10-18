import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {FadeInDirective} from "../../directives/fade-in.directive";
import {EffectColor} from "../../models/effects.interface";

export type PointGradientType = EffectColor | PointImageGradient;

export enum PointImageGradient {
  POLYGON = 'poly.png',
  HEXAGON = 'hexagon.png',
  LINES = 'lines.png',
}

@Component({
  selector: 'bg-point-gradient',
  standalone: true,
  imports: [
    NgClass,
    FadeInDirective,
    NgStyle
  ],
  templateUrl: './point-gradient.component.html',
  styleUrl: './point-gradient.component.scss'
})
export class PointGradientComponent {

  @Input() type: PointGradientType = EffectColor.SECONDARY;

  protected isImageGradient(): boolean {
    return Object.values(PointImageGradient).includes(this.type as PointImageGradient);
  }

  protected isColorGradient(): boolean {
    return Object.values(EffectColor).includes(this.type as EffectColor);
  }

  protected getGradientClass(): string {
    if (this.isImageGradient()) {
      return `point-gradient-image`;
    }
    return `${this.type}`;
  }

  protected getImageUrl(): string {
    return `../../../../assets/bgs/${this.type}`;
  }

}
