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
import {LoggerService} from "./logger/logger.service";

/**
 * Enum für die Richtung des Parallax-Effekts.
 */
export enum Direction {
  POSITIVE = "+",
  NEGATIVE = "-"
}

export type ParallaxConfig = {
  valueName: string,
  startValue: number,
  position?: 'absolute' | 'relative',
  maxValue?: number,
  minValue?: number,
  unit: string ,
  direction: Direction,
  strength: number,
  scrollStart: number
}

export class ParallaxBuilder {

    public static Direction = Direction;

    public static fromConfig(config: ParallaxConfig): ParallaxBuilder {

      const builder = new ParallaxBuilder()
        .setValueName(config.valueName)
        .setStartValue(config.startValue)
        .setDirection(config.direction)
        .setStrength(config.strength)
        .setScrollStart(config.scrollStart);

      if(config.maxValue !== undefined) builder.setMaxValue(config.maxValue)
      if(config.minValue !== undefined) builder.setMinValue(config.minValue)
      if (config.unit !== undefined) builder.setUnit(config.unit);
      if(config.position !== undefined) builder.setPosition(config.position)

      return builder;
    }

    public static create(): ParallaxBuilder {
      return new ParallaxBuilder();
    }

    public static defaultConfig(): ParallaxBuilder {
      return new ParallaxBuilder();
    }

    private config: ParallaxConfig = {
      valueName: "top",
      startValue: 0,
      unit: "px",
      direction: Direction.POSITIVE,
      position: "relative",
      strength: 1,
      scrollStart: 0
    };

    public setValueName(valueName: string): ParallaxBuilder {
      this.config.valueName = valueName;
      return this;
    }

    public setStartValue(value: number): ParallaxBuilder {
      this.config.startValue = value;
      return this;
    }

    public setMaxValue(value: number): ParallaxBuilder {
      this.config.maxValue = value;
      return this;
    }

    public setMinValue(value: number): ParallaxBuilder {
      this.config.minValue = value;
      return this;
    }

    public setUnit(unit: string): ParallaxBuilder {
      this.config.unit = unit;
      return this;
    }

    public setPosition(position: 'absolute' | 'relative'): ParallaxBuilder {
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

    public build(): ParallaxConfig {
      return this.config;
    }
}

@Directive({
  selector: '[parallax]',
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
  @Input('parallax') builder: ParallaxBuilder | undefined;

  private config: ParallaxConfig | undefined;

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
    let value2 :number = parseFloat(style.getPropertyValue(this.config.valueName).replace(this.config.unit || false, ""))

    let scrollY = window.scrollY - this.config.scrollStart;
    if(scrollY < 0)  {
      return;
    }

    let rawVal = this.config.direction === Direction.POSITIVE ?
      this.config.startValue + scrollY * this.config.strength :
      this.config.startValue - scrollY * this.config.strength;

    if(this.config.maxValue && rawVal >= this.config.maxValue) {
      if(value2 === this.config.maxValue) return;
      rawVal = this.config.maxValue;
    }
    if(this.config.minValue && rawVal < this.config.minValue) {
      if (value2 === this.config.minValue) return;
      rawVal = this.config.minValue;
    }


    let strVal = rawVal + this.config.unit;

    this.logger.debug("setting style", valueName, "to", strVal)

    this.renderer.setStyle(this.ele.nativeElement, this.config.valueName, strVal);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ele: ElementRef,
    private logger: LoggerService,
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

    this.renderer.setStyle(this.ele.nativeElement, "position", this.config.position || "relative");
    this.renderer.setStyle(this.ele.nativeElement, this.config.valueName, this.config.startValue + this.config.unit || "px");

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
