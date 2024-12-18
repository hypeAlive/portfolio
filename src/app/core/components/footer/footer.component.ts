import { Component, OnInit } from '@angular/core';
import { provideIcons } from "@ng-icons/core";
import { bootstrapDiscord, bootstrapGithub, bootstrapLinkedin, bootstrapTwitterX } from "@ng-icons/bootstrap-icons";
import { FooterBackground, FooterService } from "../../services/footer.service";

@Component({
    selector: 'core-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    viewProviders: [provideIcons({ bootstrapDiscord, bootstrapGithub, bootstrapLinkedin, bootstrapTwitterX })],
    standalone: false
})
export class FooterComponent implements OnInit {

  protected currentYear!: number;

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  protected isSmall(): boolean {
    return this.footerService.getConfig().small;
  }

  protected isHalfOpacity(): boolean {
    return this.footerService.getConfig().background === FooterBackground.HALF_OPACITY;
  }

  protected isTransparent(): boolean {
    return this.isHalfOpacity() || this.footerService.getConfig().background === FooterBackground.HIDE;
  }

  protected isFixed(): boolean {
    return this.footerService.getConfig().fixed;
  }
}
