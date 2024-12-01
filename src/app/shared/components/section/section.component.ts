import {Component, input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {
  PointGradientComponent, PointImageGradient
} from "../point-gradient/point-gradient.component";
import {EffectColor} from "../../models/effects.interface";

export enum SectionWave {
  TOP = 'top',
  BOTTOM = 'bottom',
  BOTH = 'both',
  NONE = 'none'
}

@Component({
    selector: 'app-section',
    imports: [
        NgIf,
        NgClass,
        PointGradientComponent
    ],
    templateUrl: './section.component.html',
    styleUrl: './section.component.scss'
})
export class SectionComponent {

  readonly withWave = input<SectionWave>(SectionWave.NONE);
  readonly withGradient = input(false);
  readonly withBgImage = input<PointImageGradient>();

  protected isWaveTop(): boolean {
    const withWave = this.withWave();
    return withWave === SectionWave.TOP || withWave === SectionWave.BOTH;
  }

  protected isWaveBottom(): boolean {
    const withWave = this.withWave();
    return withWave === SectionWave.BOTTOM || withWave === SectionWave.BOTH;
  }

  protected readonly PointColorGradient = EffectColor;
  protected readonly PointImageGradient = PointImageGradient;
}
