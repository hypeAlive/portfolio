import {
  Component,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation, Input, OnChanges,
  SimpleChanges,
} from '@angular/core';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {Key, KeyEvent, KeyHelper} from "../../models/keyboard-keys";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    LottieComponent
  ],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeyboardComponent implements OnDestroy, OnChanges {
  @ViewChild(LottieComponent) lottieComponent!: LottieComponent;
  @Output('onKeyBoardEvent') onKeyBoardEvent: EventEmitter<KeyEvent> = new EventEmitter<KeyEvent>();
  @Input('listenToKeyboard') listenToKeyboard: boolean = true;

  options: AnimationOptions = {
    path: '/assets/test-keyboard/data.json',
  };

  constructor(private logger: NGXLogger) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listenToKeyboard']) {
      if(changes['listenToKeyboard'].currentValue === false) {
        this.deactivateAllKeys();
      }
    }
  }

  private keyImageMap: Map<number, HTMLElement> = new Map();
  private activeKeys: Map<number, boolean> = new Map();
  private keyListener: Map<number, any> = new Map();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.listenToKeyboard) return;
    const key = KeyHelper.getKey(event);
    if (!key) return;
    event.preventDefault();

    if (this.activeKeys.has(key.id)) {
      this.activeKeys.set(key.id, true);
      return;
    }

    this.activateKey(key);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!this.listenToKeyboard) return;
    const key = KeyHelper.getKey(event);
    if (!key) return;

    this.deactivateKey(key);
    event.preventDefault();
  }

  @HostListener('window:blur')
  onWindowBlur() {
    if (!this.listenToKeyboard) return;
    this.deactivateAllKeys();
  }

  private deactivateAllKeys() {
    this.activeKeys.forEach((_, keyId) => this.deactivateKeyById(keyId));
  }

  animationCreated(): void {
    const container = this.lottieComponent.container.nativeElement;

    setTimeout(() => {
      const groupElement = container.querySelector('g');

      if (!groupElement) {
        this.logger.error('Gruppierung nicht gefunden');
        return;
      }

      KeyHelper.getAllKeys().forEach((key) => {
        const imageElement = Array.from(groupElement.querySelectorAll('image')).find((img: SVGImageElement) => {
          return img.getAttribute('href')?.endsWith('_' + key.id + '.png');
        });

        if (!imageElement) {
          this.logger.error(`Bild mit ${key} nicht gefunden`);
          return;
        }

        const keyGroup = this.getGroupGElementFromImageElement(imageElement);

        if (!keyGroup) {
          this.logger.error(`Gruppierung nicht gefunden für ${key}`);
          return;
        }

        const clickListener = () => {
          this.activeKeys.set(key.id, false);
          this.onKeyBoardEvent.emit({key: key, pressedViaMouse: true});
        };

        keyGroup.addEventListener('mousedown', clickListener);
        this.keyListener.set(key.id, clickListener);
        this.keyImageMap.set(key.id, keyGroup);

      });
    }, 500);
  }

  private getGroupGElementFromImageElement(imageElement: SVGImageElement): HTMLElement | null {
    const parent = imageElement.parentElement;
    if (!parent) return null;
    const parentParent = parent.parentElement;
    if (!parentParent) return null;
    return parentParent as HTMLElement;
  }

  activateKey(key: Key) {
    const keyGroup = this.keyImageMap.get(key.id);
    if (!keyGroup) return;
    keyGroup.classList.add('active');
    this.activeKeys.set(key.id, false);
    this.onKeyBoardEvent.emit({key: key, pressedViaMouse: false});
  }

  deactivateKey(key: Key) {
    this.deactivateKeyById(key.id);
  }

  deactivateKeyById(keyId: number) {
    const activeKey = this.activeKeys.get(keyId);
    if (activeKey === undefined) return;
    const keyGroup = this.keyImageMap.get(keyId);
    if (!keyGroup) return;
    setTimeout(() => {
      keyGroup.classList.remove('active');
    }, activeKey ? 0 : 100);
    this.activeKeys.delete(keyId);
  }

  ngOnDestroy(): void {
    this.keyListener.forEach((listener, keyId) => {
      const keyGroup = this.keyImageMap.get(keyId);
      if (!keyGroup) return;
      keyGroup.removeEventListener('mousedown', listener);
    });
  }
}
