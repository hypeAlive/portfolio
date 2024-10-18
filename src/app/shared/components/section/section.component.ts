import {Component, Input} from '@angular/core';
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
  standalone: true,
    imports: [
        NgIf,
        NgClass,
        PointGradientComponent
    ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

  @Input('withWave') withWave: SectionWave = SectionWave.NONE;
  @Input('withGradient') withGradient = false;
  @Input('withBgImage') withBgImage: PointImageGradient | undefined = undefined;

  protected isWaveTop(): boolean {
    return this.withWave === SectionWave.TOP || this.withWave === SectionWave.BOTH;
  }

  protected isWaveBottom(): boolean {
    return this.withWave === SectionWave.BOTTOM || this.withWave === SectionWave.BOTH;
  }

  protected readonly PointColorGradient = EffectColor;
  protected readonly PointImageGradient = PointImageGradient;
}
