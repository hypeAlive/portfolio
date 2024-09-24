import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../../../home/components/card/card.component";
import {MouseLightEffectDirective} from "../../../../shared/directives/mouse-light-effect.directive";
import {CardCarouselComponent} from "../../../home/components/card-carousel/card-carousel.component";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  imports: [
  ],
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  constructor(private logger: NGXLogger, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.logger.log(this.activatedRoute.snapshot.data);
    this.logger.info('ProjectComponent initialized');
  }

  getItems(): ProjectCard[] {
    return [];
  }


}
