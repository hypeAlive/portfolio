import {Component} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES} from "../card/card.component";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'card-carousel',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent {

  items = Array(5).fill(0);
  selectedIndex = 2;
  blocked = false;

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;

  getCardClasses(index: number): { [key: string]: boolean } {
    const length = this.items.length;
    return {
      'active': index === this.selectedIndex,
      'next': index === (this.selectedIndex + 1) % length,
      'prev': index === (this.selectedIndex - 1 + length) % length,
      'next-next': index === (this.selectedIndex + 2) % length,
      'prev-prev': index === (this.selectedIndex - 2 + length) % length
    };
  }

  minusLoop(currentIndex: number = this.selectedIndex): number {
    const length = this.items.length;
    return (currentIndex - 1 + length) % length;
  }

  plusLoop(currentIndex: number = this.selectedIndex): number {
    const length = this.items.length;
    return (currentIndex + 1) % length;
  }


  onRadioChange(goToIndex: number): void {
    if (this.blocked) return;

    if(goToIndex === this.plusLoop() || goToIndex === this.minusLoop()) {
      this.selectedIndex = goToIndex;
      return;
    }

    if(goToIndex === this.plusLoop(this.plusLoop())) {
      this.blocked = true;
      this.selectedIndex = this.plusLoop();
      setTimeout(() => {
        this.selectedIndex = this.plusLoop();
        this.blocked = false;
      },250);
      return;
    }

    if(goToIndex === this.minusLoop(this.minusLoop())) {
      this.blocked = true;
      this.selectedIndex = this.minusLoop();
      setTimeout(() => {
        this.selectedIndex = this.minusLoop();
        this.blocked = false;
      },250);
      return;
    }

    throw new Error('Invalid index');

  }

}
