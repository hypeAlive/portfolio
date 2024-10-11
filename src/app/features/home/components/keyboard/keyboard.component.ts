import {Component, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

export enum KEYBOARD_KEYS {
  SPACE = 'img_4.png',
  ENTER = 'img_35.png',
}

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    LottieComponent
  ],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements AfterViewInit {
  @ViewChild(LottieComponent) lottieComponent!: LottieComponent; // LottieComponent Referenz
  options: AnimationOptions = {
    path: '/assets/test-keyboard/data.json',
  };

  private keyImageMap: Map<KEYBOARD_KEYS, SVGImageElement> = new Map();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log('Keydown:', event.code);
    if (event.key === ' ') {
      // Wenn die Leertaste gedrückt wird, rufe die activateKey-Methode auf
      this.activateKey(KEYBOARD_KEYS.SPACE);
      event.preventDefault(); // Verhindert das Standardverhalten (z.B. Scrollen)
    }

    if (event.code === 'Enter') {
      // Wenn die Enter-Taste gedrückt wird, rufe die activateKey-Methode auf
      this.activateKey(KEYBOARD_KEYS.ENTER);
      event.preventDefault(); // Verhindert das Standardverhalten (z.B. Formular absenden)
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log('Keydown:', event.code);
    if (event.code === 'Space') {
      // Wenn die Leertaste gedrückt wird, rufe die activateKey-Methode auf
      this.deactivateKey(KEYBOARD_KEYS.SPACE);
      event.preventDefault(); // Verhindert das Standardverhalten (z.B. Scrollen)
    }

    if (event.code === 'Enter') {
      // Wenn die Enter-Taste gedrückt wird, rufe die activateKey-Methode auf
      this.deactivateKey(KEYBOARD_KEYS.ENTER);
      event.preventDefault(); // Verhindert das Standardverhalten (z.B. Formular absenden)
    }
  }

  ngAfterViewInit() {
    // Hier kannst du Initialisierungen vornehmen
  }

  animationCreated(animationItem: AnimationItem): void {
    const container = this.lottieComponent.container.nativeElement;

    setTimeout(() => {
      // Suche nach dem `<g>`-Element
      const groupElement = container.querySelector('g');

      if (!groupElement) {
        console.error('Container nicht gefunden');
        return;
      }

      // Durchlaufe alle Keys im Enum
      Object.values(KEYBOARD_KEYS).forEach((key) => {
        // Suche nach dem `<image>`-Element mit dem spezifischen `xlink:href`
        const imageElement = Array.from(groupElement.querySelectorAll('image')).find((img: SVGImageElement) => {
          return img.getAttribute('href')?.includes(key);
        });

        if (imageElement) {
          console.log(`Bild gefunden für ${key}:`, imageElement); // Gibt das gefundene Bild-Element aus
          this.keyImageMap.set(key, imageElement); // Speichere das Bild in der Map
        } else {
          console.error(`Bild mit ${key} nicht gefunden`);
        }
      });
    }, 500);

    console.log(animationItem);
  }

  activateKey(key: KEYBOARD_KEYS) {
    const imageElement = this.keyImageMap.get(key);

    if (imageElement) {
      imageElement.classList.add('active');
    }
  }

  deactivateKey(key: KEYBOARD_KEYS) {
    const imageElement = this.keyImageMap.get(key);

    if (imageElement) {
      imageElement.classList.remove('active');
    }
  }

  protected readonly KEYBOARD_KEYS = KEYBOARD_KEYS;
}
