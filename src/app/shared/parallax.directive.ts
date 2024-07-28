import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {DeviceDetectorService} from "ngx-device-detector";

/**
 * Enum für die Richtung des Parallax-Effekts.
 */
export enum Direction {
  positive = "+",
  negative = "-"
}

export class ParallaxBuilder {

    public static Direction = Direction;

    public static fromConfig(config: {
      valueName: string,
      position: number,
      direction: Direction,
      strength: number,
      scrollStart: number
    }): ParallaxBuilder {
      return new ParallaxBuilder()
        .setValueName(config.valueName)
        .setPosition(config.position)
        .setDirection(config.direction)
        .setStrength(config.strength)
        .setScrollStart(config.scrollStart);
    }

    public static create(): ParallaxBuilder {
      return new ParallaxBuilder();
    }

    public static defaultConfig(): ParallaxBuilder {
      return new ParallaxBuilder();
    }

    private config: {
      valueName: string,
      position: number,
      direction: Direction,
      strength: number,
      scrollStart: number
    } = {
      valueName: "top",
      position: 0,
      direction: Direction.positive,
      strength: 1,
      scrollStart: 0
    };

    public setValueName(valueName: string): ParallaxBuilder {
      this.config.valueName = valueName;
      return this;
    }

    public setPosition(position: number): ParallaxBuilder {
      this.config.position = position;
      return this;
    }

    public setDirection(direction: Direction): ParallaxBuilder {
      this.config.direction = direction;
      return this;
    }

    public setStrength(strength: number): ParallaxBuilder {
      this.config.strength = strength;
      return this;
    }

    public setScrollStart(scrollStart: number): ParallaxBuilder {
      this.config.scrollStart = scrollStart;
      return this;
    }

    public build(): {
      valueName: string,
      position: number,
      direction: Direction,
      strength: number,
      scrollStart: number
    } {
      return this.config;
    }
}

@Directive({
  selector: '[heroParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {

  public static readonly INSTANCES: ParallaxDirective[] = [];

  /**
   * Konfiguration für den Parallax-Effekt.
   * @param {string} valueName - Der Name der CSS-Eigenschaft, die geändert werden soll.
   * @param {number} position - Der Startwert der CSS-Eigenschaft.
   * @param {Direction} direction - Die Richtung des Parallax-Effekts.
   * @param {number} strength - Die Stärke des Parallax-Effekts.
   * @param {number} scrollStart - Der Scroll-Wert, bei dem der Parallax-Effekt beginnt.
   */
  @Input('heroParallax') builder: ParallaxBuilder | undefined;

  private config: {
    valueName: string,
    position: number,
    direction: Direction,
    strength: number,
    scrollStart: number
  } | undefined;

  /**
   * Gibt an, ob die Direktive aktiv ist.
   */
  private active: boolean = true;

  /**
   * Event-Listener für das Scroll-Ereignis.
   * @param {Event} event - Das Scroll-Ereignis.
   */
  @HostListener("window:scroll", ["$event"]) onWindowScroll(event: Event | null) {
    if(this.device.isMobile() || this.device.isTablet()) return;

    if(!this.active || this.config === undefined) {
      return;
    }
    if ((event !== null && this.isOutsideViewport(this.ele)) && window.scrollY > 50) {
      return;
    }

    let valueName:string = this.config.valueName;

    let style = (window.getComputedStyle(this.ele.nativeElement) as any);
    let value2 :number = parseInt(style[valueName].slice(0, -2))

    if(value2 !== this.config.position) {
      let number:number = value2;
      if(number < this.config.position + 80 || number > this.config.position - 80) {
        this.renderer.setStyle(this.ele.nativeElement, this.config.valueName, this.config.position + "px");
      }
    }

    let scrollY = window.scrollY - this.config.scrollStart;
    if(scrollY < 0)  {
      return;
    }

    let value = `${
      this.config.direction === Direction.positive ?
        this.config.position + scrollY * this.config.strength :
        this.config.position - scrollY * this.config.strength
    }px`;

    this.renderer.setStyle(this.ele.nativeElement, this.config.valueName, value);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ele: ElementRef,
    private device: DeviceDetectorService,
    private renderer: Renderer2) {
    this.config = this.builder?.build();
  }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Direktive initialisiert wird.
   * setzt die standartmäßigen CSS-Eigenschaften für die Direktive.
   */
  ngOnInit(): void {
    this.config = this.builder?.build();

    if(this.config === undefined) return;

    this.renderer.setStyle(this.ele.nativeElement, "position", "relative");
    this.renderer.setStyle(this.ele.nativeElement, "top", this.config.position + "px");

    if(isPlatformBrowser(this.platformId))
      this.onWindowScroll(null);

    ParallaxDirective.INSTANCES.push(this);
  }

  public static recalculateAll() {
      ParallaxDirective.INSTANCES.forEach(instance => {
        instance.onWindowScroll(null);
      });
  }

  /**
   * Setzt den aktiven Status der Direktive.
   * @param {boolean} active - Der neue aktive Status der Direktive.
   */
  private setActive(active: boolean) {
    this.active = active;
  }

  /**
   * Aktiviert den Parallax-Effekt.
   */
  public activate() {
    this.setActive(true);
  }

  public static deactivateAll() {
    ParallaxDirective.INSTANCES.forEach(instance => {
      instance.deactivate();
    });
  }

  public static activateAll() {
    ParallaxDirective.INSTANCES.forEach(instance => {
      instance.activate();
    });
  }

  /**
   * Deaktiviert den Parallax-Effekt.
   */
  public deactivate() {
    this.setActive(false);
  }

  /**
   * Überprüft, ob ein Element außerhalb des Viewports ist.
   * @param {ElementRef} ele - Das Element, das überprüft werden soll.
   * @return {boolean} - Gibt `true` zurück, wenn das Element außerhalb des Viewports ist, sonst `false`.
   */
  private isOutsideViewport(ele: ElementRef): boolean {
    const rect = ele.nativeElement.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    return rect.top >= windowHeight ||
      rect.left >= windowWidth ||
      rect.bottom <= 0 ||
      rect.right <= 0;
  }

  ngOnDestroy(): void {
    const index = ParallaxDirective.INSTANCES.indexOf(this);
    if (index > -1) {
      ParallaxDirective.INSTANCES.splice(index, 1);
    }
  }

}
