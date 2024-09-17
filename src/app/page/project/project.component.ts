import {Component, OnInit} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../shared/card/card.component";
import {MouseLightEffectDirective} from "../shared/mouse-light-effect.directive";
import {CardCarouselComponent} from "../shared/card-carousel/card-carousel.component";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  imports: [
    CardCarouselComponent
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
