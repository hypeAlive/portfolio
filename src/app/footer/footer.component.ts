import {Component, OnInit} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  bootstrapDiscord,
  bootstrapGithub,
  bootstrapLinkedin, bootstrapTwitterX,
} from "@ng-icons/bootstrap-icons";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgIcon
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders: [provideIcons({ bootstrapDiscord, bootstrapGithub, bootstrapLinkedin, bootstrapTwitterX })]
})
export class FooterComponent implements OnInit{
  protected currentYear!: number;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
