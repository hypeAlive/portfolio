import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {FadeInDirective} from "../../directives/fade-in.directive";

export enum PointGradientType {
  PRIMARY = 'primary',
  PRIMARY_CONTENT = 'primary-content',
  SECONDARY = 'secondary',
  SECONDARY_CONTENT = 'secondary-content',
  ACCENT = 'accent',
  ACCENT_CONTENT = 'accent-content',
}

@Component({
  selector: 'bg-point-gradient',
  standalone: true,
  imports: [
    NgClass,
    FadeInDirective
  ],
  templateUrl: './point-gradient.component.html',
  styleUrl: './point-gradient.component.scss'
})
export class PointGradientComponent {

  @Input() type: PointGradientType = PointGradientType.SECONDARY;

  protected getGradientClass(): string {
    return `point-gradient ${this.type}`;
  }

}
