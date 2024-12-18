import {
  Component,
  HostListener,
  Output,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation, OnChanges,
  SimpleChanges,
  input,
  viewChild
} from '@angular/core';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-keyboard',
    imports: [
        LottieComponent
    ],
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class KeyboardComponent implements OnDestroy, OnChanges {
  readonly lottieComponent = viewChild.required(LottieComponent);
  readonly listenToKeyboard = input<boolean>(true);

  options: AnimationOptions = {
    path: 'https://cms.nicolasfritz.dev/assets/24d8ec04-ba2b-4885-8c33-99ea9efe843c',
    autoplay: false,
    loop: false
  };

  constructor(private logger: NGXLogger) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private keyImageMap: Map<number, HTMLElement> = new Map();
  private activeKeys: Map<number, boolean> = new Map();
  private keyListener: Map<number, any> = new Map();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
  }

  @HostListener('window:blur')
  onWindowBlur() {
  }

  private deactivateAllKeys() {
  }

  animationCreated(): void {

  }

  private getGroupGElementFromImageElement(imageElement: SVGImageElement): HTMLElement | null {
    const parent = imageElement.parentElement;
    if (!parent) return null;
    const parentParent = parent.parentElement;
    if (!parentParent) return null;
    return parentParent as HTMLElement;
  }

  deactivateKeyById(keyId: number) {
  }

  ngOnDestroy(): void {
  }
}
