import {Component, input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {FadeInDirective} from "../../directives/fade-in.directive";
import {EffectColor} from "../../models/effects.interface";
import {environment} from "../../../../environments/environment";

export type PointGradientType = EffectColor | PointImageGradient;

export enum PointImageGradient {
  POLYGON = '83a81ead-ec70-44a5-a4fc-de96e44799b5',
  HEXAGON = 'db78e3cf-bccb-4259-9844-18ba0963fe40',
  LINES = 'fb471dc1-967c-4db4-8c89-fdfcfb463534',
}

@Component({
    selector: 'bg-point-gradient',
    imports: [
        NgClass,
        FadeInDirective,
        NgStyle
    ],
    templateUrl: './point-gradient.component.html',
    styleUrl: './point-gradient.component.scss'
})
export class PointGradientComponent {

  readonly type = input<PointGradientType | undefined>(EffectColor.SECONDARY);

  protected isImageGradient(): boolean {
    return Object.values(PointImageGradient).includes(this.type() as PointImageGradient);
  }

  protected isColorGradient(): boolean {
    return Object.values(EffectColor).includes(this.type() as EffectColor);
  }

  protected getGradientClass(): string {
    if (this.isImageGradient()) {
      return `point-gradient-image`;
    }
    return `${this.type()}`;
  }

  protected getImageUrl(): string {
    return environment.cmsUrl + `/assets/${this.type()}`;
  }

}
