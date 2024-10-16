import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

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
    NgClass
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

  @Input('withWave') withWave: SectionWave = SectionWave.NONE;
  @Input('withGradient') withGradient = false;

  protected isWaveTop(): boolean {
    return this.withWave === SectionWave.TOP || this.withWave === SectionWave.BOTH;
  }

  protected isWaveBottom(): boolean {
    return this.withWave === SectionWave.BOTTOM || this.withWave === SectionWave.BOTH;
  }

}
