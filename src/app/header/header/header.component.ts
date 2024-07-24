import {
  AfterViewInit,
  Component,
  ElementRef, HostListener, Inject,
  OnDestroy,
  OnInit, PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {provideIcons} from "@ng-icons/core";
import {
  featherMenu,
  featherMoon,
  featherSun,
  featherX
} from "@ng-icons/feather-icons";
import {heroSun, heroMoon} from "@ng-icons/heroicons/outline";
import {heroBars3Solid, heroXMarkSolid} from "@ng-icons/heroicons/solid";
import {ThemeService} from "../../shared/theme/theme.service";
import {Subscription} from "rxjs";
import {Themes} from "../../shared/theme/Themes";
import {SwapComponent} from "../../shared/swap/swap.component";
import {state} from "@angular/animations";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({featherMenu, heroSun, heroMoon, heroXMarkSolid, heroBars3Solid})]
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('themeSwitch') themeSwitch!: SwapComponent;
  @ViewChild('underline') underlineElement!: ElementRef;
  @ViewChildren('customLink', { read: ElementRef }) customLinks!: QueryList<ElementRef>;
  @ViewChild('navbarCenter') navbarCenter!: ElementRef;

  private themeIconSubscription!: Subscription;

  protected screenTop = 0;

  constructor(private themeService: ThemeService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.screenTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  ngAfterViewInit(): void {
    this.themeIconSubscription = this.themeSwitch
      .subscribeStateChange((state) => {
        this.themeService.switchTheme(state === 'disabled' ? Themes.DARK : Themes.LIGHT);
      });

    this.customLinks.forEach(link => {
      link.nativeElement.addEventListener('mouseover', this.onHover.bind(this, link));
      link.nativeElement.addEventListener('mouseout', this.onMouseOut.bind(this));
      link.nativeElement.addEventListener('click', this.onClick.bind(this, link));
    });
  }

  ngOnDestroy() {
    this.themeIconSubscription.unsubscribe();
  }

  protected getThemeSwitchIcons(): [string, string] {
    return [heroMoon, heroSun];
  }

  onHover(link: ElementRef) {
    this.updateUnderline(link.nativeElement);
  }

  onMouseOut() {
    const activeLink = this.customLinks.find(link => link.nativeElement.classList.contains('active'));
    if (activeLink) {
      this.updateUnderline(activeLink.nativeElement);
    } else {
      this.underlineElement.nativeElement.style.width = '0';
    }
  }

  onClick(link: ElementRef) {
    this.customLinks.forEach(otherLink => {
      otherLink.nativeElement.classList.remove('active');
    });
    link.nativeElement.classList.add('active');
    this.updateUnderline(link.nativeElement);
  }

  updateUnderline(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const navbarRect = this.navbarCenter.nativeElement.getBoundingClientRect();
    this.underlineElement.nativeElement.style.width = `${rect.width}px`;
    this.underlineElement.nativeElement.style.left = `${rect.left - navbarRect.left + rect.width / 2}px`;
    this.underlineElement.nativeElement.style.transformOrigin = 'center';
  }

  ngOnInit(): void {
    this.onScroll();
  }

}

/**
 * Building Future,
 * Line by Line
 */
