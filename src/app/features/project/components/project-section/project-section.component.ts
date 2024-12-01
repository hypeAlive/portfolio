import {Component, input} from '@angular/core';
import {ProjectSection} from "../../../../shared/models/project.interface";
import {NgIf} from "@angular/common";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";
import {getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {SectionComponent} from "../../../../shared/components/section/section.component";
import {
  PointGradientComponent,
  PointImageGradient
} from "../../../../shared/components/point-gradient/point-gradient.component";

@Component({
    selector: 'project-section',
    imports: [
        NgIf,
        FadeInDirective,
        SectionComponent,
        PointGradientComponent
    ],
    templateUrl: './project-section.component.html',
    styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent {

  readonly section = input<ProjectSection>();

  get translation() {
    return this.section()?.translations[0];
  }

  get isLeftImg() {
    return this.section()?.has_img === 'left';
  }

  get isRightImg() {
    return this.section()?.has_img === 'right';
  }

  get hasImg() {
    return this.section()?.has_img !== 'hidden';
  }

  get img() {
    const section = this.section();
    return section ? getDirectusFileUrl(section.img) : '';
  }


  protected readonly PointImageGradient = PointImageGradient;
}
