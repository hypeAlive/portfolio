import { Component } from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../shared/card/card.component";
import {MouseLightEffectDirective} from "../shared/mouse-light-effect.directive";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CardComponent,
    MouseLightEffectDirective
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

    protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;
}
