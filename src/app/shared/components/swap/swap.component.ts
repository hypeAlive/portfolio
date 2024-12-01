import {AfterViewInit, Component, ElementRef, OnDestroy, input, viewChild} from '@angular/core';
import {NgIcon, NgIconComponent} from "@ng-icons/core";
import {Subject, Subscription} from "rxjs";

export type SwapState = 'active' | 'disabled';

@Component({
    selector: 'btn-swap',
    imports: [
        NgIcon
    ],
    templateUrl: './swap.component.html',
    styleUrl: './swap.component.scss'
})
export class SwapComponent implements AfterViewInit, OnDestroy {

  readonly checkbox = viewChild.required<ElementRef>('checkbox');
  readonly onIcon = viewChild.required<NgIconComponent>('onIcon');
  readonly offIcon = viewChild.required<NgIconComponent>('offIcon');
  public readonly icons = input.required<[
    string,
    string
] | [
    string
]>();
  readonly elementRef = viewChild.required<ElementRef>('nativeElement');

  private stateChange: Subject<SwapState> = new Subject<SwapState>();

  constructor() {
  }

  ngAfterViewInit(): void {
    const icons = this.icons();
    this.onIcon().svg = icons[1] || icons[0];
    this.offIcon().svg = this.icons()[0];
  }

  ngOnDestroy(): void {
    this.stateChange.unsubscribe();
  }

  get nativeElement() {
    return this.elementRef().nativeElement;
  }

  public isChecked() {
    return this.checkbox().nativeElement.checked;
  }

  public check() {
    this.checkbox().nativeElement.checked = true;
  }

  public uncheck() {
    this.checkbox().nativeElement.checked = false;
    this.next();
  }

  public swap() {
    this.isChecked() ? this.uncheck() : this.check();
  }

  public subscribeStateChange(callback: (state: SwapState) => void): Subscription {
    return this.stateChange.subscribe(callback);
  }

  protected next() {
    this.stateChange.next(this.isChecked() ? 'active' : 'disabled');
  }

}
