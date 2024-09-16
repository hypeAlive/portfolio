import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

  protected static TEST_ITEMS: ProjectCard[] = [{
    title: "PreisCxn",
    languages: [PROGRAMMING_LANGUAGES.ANGULAR, PROGRAMMING_LANGUAGES.JAVA],
    description: "A platform for comparing prices of different products.",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }, {
    title: "Ng-Icons",
    languages: [PROGRAMMING_LANGUAGES.TYPESCRIPT, PROGRAMMING_LANGUAGES.JAVASCRIPT],
    description: "A library for using icons in Angular applications.",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }, {
    title: "Socket Games",
    languages: [PROGRAMMING_LANGUAGES.JAVASCRIPT, PROGRAMMING_LANGUAGES.EXPRESS],
    description: "A platform for playing games with friends.",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }, {
    title: "Holiday Exporter",
    languages: [PROGRAMMING_LANGUAGES.PYTHON],
    description: "A tool for exporting holidays to an excel file.",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }, {
    title: "DaisyUI",
    languages: [PROGRAMMING_LANGUAGES.JAVASCRIPT],
    description: "A library for creating responsive web designs.",
    imgUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }];

  @ViewChildren('cards') cards!: QueryList<CardComponent>;

  selectedIndex = 2;
  blocked = false;

  protected readonly PROGRAMMING_LANGUAGES = PROGRAMMING_LANGUAGES;

  getCardClasses(index: number): { [key: string]: boolean } {
    const length = CardCarouselComponent.TEST_ITEMS.length;
    return {
      'active': index === this.selectedIndex,
      'next': index === (this.selectedIndex + 1) % length,
      'prev': index === (this.selectedIndex - 1 + length) % length,
      'next-next': index === (this.selectedIndex + 2) % length,
      'prev-prev': index === (this.selectedIndex - 2 + length) % length
    };
  }

  minusLoop(currentIndex: number = this.selectedIndex): number {
    const length = CardCarouselComponent.TEST_ITEMS.length;
    return (currentIndex - 1 + length) % length;
  }

  plusLoop(currentIndex: number = this.selectedIndex): number {
    const length = CardCarouselComponent.TEST_ITEMS.length;
    return (currentIndex + 1) % length;
  }


  onRadioChange(goToIndex: number): void {
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
