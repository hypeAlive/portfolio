import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CardComponent, PROGRAMMING_LANGUAGES, ProjectCard} from "../card/card.component";
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

  @ViewChildren('cards') cards!: QueryList<CardComponent>;
  @Input('cards') items: ProjectCard[] | undefined = undefined;

  private selectedIndex = 2;
  private blocked = false;

  protected getCardClasses(index: number): { [key: string]: boolean } {
    const length = this.getItems().length;
    return {
      'active': index === this.selectedIndex,
      'next': index === (this.selectedIndex + 1) % length,
      'prev': index === (this.selectedIndex - 1 + length) % length,
      'next-next': index === (this.selectedIndex + 2) % length,
      'prev-prev': index === (this.selectedIndex - 2 + length) % length
    };
  }

  private minusLoop(currentIndex: number = this.selectedIndex): number {
    const length = this.getItems().length;
    return (currentIndex - 1 + length) % length;
  }

  private plusLoop(currentIndex: number = this.selectedIndex): number {
    return (currentIndex + 1) % this.getItems().length;
  }

  protected isSelected(index: number) {
    return index === this.selectedIndex;
  }

  protected getItems() {
    return this.items || new Array(5).fill(undefined);
  }

  protected onRadioChange(goToIndex: number): void {
    if (this.blocked) return;

    const currentCard = this.cards.get(this.selectedIndex);
    const nextCard = this.cards.get(goToIndex);
    if (!currentCard || !nextCard) throw new Error('Could not find card');

    const nextIndex = this.plusLoop();
    const prevIndex = this.minusLoop();
    const nextNextIndex = this.plusLoop(nextIndex);
    const prevPrevIndex = this.minusLoop(prevIndex);

    if (goToIndex === nextIndex || goToIndex === prevIndex) {
      currentCard.deactivate();
      this.selectedIndex = goToIndex;
      nextCard.activate();
      return;
    }

    if (goToIndex === nextNextIndex || goToIndex === prevPrevIndex) {
      this.blocked = true;
      currentCard.deactivate();
      this.selectedIndex = goToIndex === nextNextIndex ? nextIndex : prevIndex;
      nextCard.activate();
      setTimeout(() => {
        this.selectedIndex = goToIndex;
        this.blocked = false;
      }, 250);
      return;
    }

    throw new Error('Invalid index');
  }

}
