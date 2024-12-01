import {Component, input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-rainbow-text',
    imports: [
        NgClass
    ],
    templateUrl: './rainbow-text.component.html',
    styleUrl: './rainbow-text.component.scss'
})
export class RainbowTextComponent {

  readonly text = input<string>('');
  readonly animate = input<boolean>(true);
}
