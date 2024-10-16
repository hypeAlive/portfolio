import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NGXLogger} from "ngx-logger";

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {

  @Input() delay: string = '0s';
  /**
   * If true, the element will fade in again when it comes back into view
   */
  @Input() reFade: boolean = true;

  private static observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.transitionDelay = entry.target.getAttribute('fade-in-delay') || '0s';
        entry.target.classList.add('fade-in');
        if (entry.target.getAttribute('fade-in-re-fade') === 'false') {
          FadeInDirective.observer.unobserve(entry.target);
        }
      } else {
        if (entry.target.getAttribute('fade-in-re-fade') === 'false') return;

        entry.target.classList.remove('fade-in');
        (entry.target as HTMLElement).style.transitionDelay = '0s';
      }
    });
  });

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.observer.unobserve(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'fade');
    this.renderer.setAttribute(this.element.nativeElement, 'fade-in-delay', `${this.delay}`);
    this.renderer.setAttribute(this.element.nativeElement, 'fade-in-re-fade', `${this.reFade}`);
    this.observer.observe(this.element.nativeElement);
  }

  private get observer(): IntersectionObserver {
    return FadeInDirective.observer;
  }

}
