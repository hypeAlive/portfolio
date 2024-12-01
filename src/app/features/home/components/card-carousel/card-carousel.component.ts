import {AfterViewInit, Component, OnChanges, SimpleChanges, input, viewChildren} from '@angular/core';
import {CardComponent, ProjectCard} from "../card/card.component";
import {NgClass, NgForOf} from "@angular/common";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";

@Component({
    selector: 'card-carousel',
    imports: [
        CardComponent,
        NgForOf,
        NgClass,
        FadeInDirective
    ],
    templateUrl: './card-carousel.component.html',
    styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent {

  readonly cards = viewChildren<CardComponent>('cards');
  readonly items = input<ProjectCard[] | undefined>(undefined, {alias: "cards"});

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
    return this.items() || new Array(5).fill(undefined);
  }

  protected isActive(index: number) {
    return index === this.selectedIndex;
  }

  protected onRadioChange(goToIndex: number): void {
    if (this.blocked) return;

    const currentCard = this.cards().at(this.selectedIndex);
    const nextCard = this.cards().at(goToIndex);
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

  protected activateCard(index: number) {
    try {
      this.onRadioChange(index);
    } catch (e) {
      this.selectedIndex = index;
    }
  }
}
