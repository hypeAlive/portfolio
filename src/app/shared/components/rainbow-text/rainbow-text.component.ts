import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-rainbow-text',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './rainbow-text.component.html',
  styleUrl: './rainbow-text.component.scss'
})
export class RainbowTextComponent {

  @Input() text: string = '';
  @Input() animate: boolean = true;
}
