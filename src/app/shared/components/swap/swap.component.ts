import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {NgIcon, NgIconComponent} from "@ng-icons/core";
import {Subject, Subscription} from "rxjs";

export type SwapState = 'active' | 'disabled';

@Component({
  selector: 'btn-swap',
  standalone: true,
  imports: [
    NgIcon
  ],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.scss'
})
export class SwapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('checkbox') checkbox!: ElementRef;
  @ViewChild('onIcon') onIcon!: NgIconComponent;
  @ViewChild('offIcon') offIcon!: NgIconComponent;
  @Input('icons') public icons!: [string, string] | [string];
  @ViewChild('nativeElement') elementRef!: ElementRef;

  private stateChange: Subject<SwapState> = new Subject<SwapState>();

  constructor() {
  }

  ngAfterViewInit(): void {
    this.onIcon.svg = this.icons[1] || this.icons[0];
    this.offIcon.svg = this.icons[0];
  }

  ngOnDestroy(): void {
    this.stateChange.unsubscribe();
  }

  get nativeElement() {
    return this.elementRef.nativeElement;
  }

  public isChecked() {
    return this.checkbox.nativeElement.checked;
  }

  public check() {
    this.checkbox.nativeElement.checked = true;
  }

  public uncheck() {
    this.checkbox.nativeElement.checked = false;
    this.next();
  }

  public swap() {
    this.isChecked() ? this.uncheck() : this.check();
  }

  public subscribeStateChange(callback: (state: SwapState) => void): Subscription {
    return this.stateChange.subscribe(callback);
  }

  protected next() {
    console.log('next', this.isChecked())
    this.stateChange.next(this.isChecked() ? 'active' : 'disabled');
  }

}
