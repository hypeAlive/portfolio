import {Component, OnInit} from '@angular/core';
import {ProjectCard} from "../../../home/components/card/card.component";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  imports: [],
  styleUrl: './project.component.scss'
})
export default class ProjectComponent implements OnInit {

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
