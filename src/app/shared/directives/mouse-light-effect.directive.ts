import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[mouseLightEffect]',
  standalone: true
})
export class MouseLightEffectDirective implements AfterViewInit {

  private mask!: HTMLElement;
  private isIn: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.mask = this.renderer.createElement('div');
    this.renderer.setStyle(this.mask, 'position', 'absolute');
    this.renderer.setStyle(this.mask, 'top', '0');
    this.renderer.setStyle(this.mask, 'left', '0');
    this.renderer.setStyle(this.mask, 'width', '100%');
    this.renderer.setStyle(this.mask, 'height', '100%');
    this.renderer.setStyle(this.mask, 'z-index', '100')
    this.renderer.setStyle(this.mask, 'opacity', '0');
    this.renderer.setStyle(this.mask, 'pointer-events', 'none');
    this.renderer.setStyle(this.mask, 'transition', 'opacity 0.2s ease-in-out');
    this.renderer.setStyle(this.mask, 'border', '5px solid rgba(255,255,255,1)');

    // Set the border-radius of the mask to match the element
    const borderRadius = window.getComputedStyle(this.el.nativeElement).borderRadius;
    this.renderer.setStyle(this.mask, 'border-radius', borderRadius);

    this.renderer.appendChild(this.el.nativeElement, this.mask);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const x = e.pageX - this.el.nativeElement.offsetLeft;
    const y = e.pageY - this.el.nativeElement.offsetTop;
    const width = this.el.nativeElement.offsetWidth;
    const height = this.el.nativeElement.offsetHeight;

    if (e.offsetX >= 0 && e.offsetX <= width && e.offsetY >= 0 && e.offsetY <= height) {
      const style = `radial-gradient(circle at ${x}px ${y}px, oklch(var(--bc)), rgba(0,0,0,0))`;
      this.renderer.setStyle(this.mask, 'background', style);
      this.renderer.setStyle(this.mask, '-webkit-mask-image', style); // Use gradient as mask image
      this.renderer.setStyle(this.mask, 'opacity', '0.2');
    } else {
      this.renderer.setStyle(this.mask, 'opacity', '0');
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: MouseEvent) {
    this.isIn = true;
    this.renderer.setStyle(this.mask, 'opacity', '0.2');
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent) {
    this.isIn = false;
    this.renderer.setStyle(this.mask, 'opacity', '0');
  }

}
