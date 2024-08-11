import { Component } from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../shared/card/card.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

    protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
