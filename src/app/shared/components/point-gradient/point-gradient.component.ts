import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {FadeInDirective} from "../../directives/fade-in.directive";

export type PointGradientType = PointColorGradient | PointImageGradient;

export enum PointColorGradient {
  PRIMARY = 'primary',
  PRIMARY_CONTENT = 'primary-content',
  SECONDARY = 'secondary',
  SECONDARY_CONTENT = 'secondary-content',
  ACCENT = 'accent',
  ACCENT_CONTENT = 'accent-content',
}

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

  @Input() type: PointGradientType = PointColorGradient.SECONDARY;

  protected isImageGradient(): boolean {
    return Object.values(PointImageGradient).includes(this.type as PointImageGradient);
  }

  protected isColorGradient(): boolean {
    return Object.values(PointColorGradient).includes(this.type as PointColorGradient);
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
