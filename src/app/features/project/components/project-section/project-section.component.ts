import {Component, Input} from '@angular/core';
import {ProjectSection} from "../../../../shared/models/project.interface";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";
import {getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {SectionComponent} from "../../../../shared/components/section/section.component";
import {
  PointGradientComponent,
  PointImageGradient
} from "../../../../shared/components/point-gradient/point-gradient.component";

@Component({
  selector: 'project-section',
  standalone: true,
  imports: [
    NgIf,
    FadeInDirective,
    NgForOf,
    NgOptimizedImage,
    SectionComponent,
    PointGradientComponent
  ],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent {

  @Input() section: ProjectSection | undefined = undefined;

  get translation() {
    return this.section?.translations[0];
  }

  get isLeftImg() {
    return this.section?.has_img === 'left';
  }

  get isRightImg() {
    return this.section?.has_img === 'right';
  }

  get hasImg() {
    return this.section?.has_img !== 'hidden';
  }

  get img() {
    return this.section ? getDirectusFileUrl(this.section.img) : '';
  }


  protected readonly PointImageGradient = PointImageGradient;
}
