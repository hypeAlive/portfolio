import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NGXLogger} from "ngx-logger";

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {

  private static observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  });

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.observer.unobserve(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'fade');
    this.observer.observe(this.element.nativeElement);
  }

  private get observer(): IntersectionObserver {
    return FadeInDirective.observer;
  }

}
