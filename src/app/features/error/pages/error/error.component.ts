import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {hugePlugSocket, hugeSettingError03} from "@ng-icons/huge-icons";
import {NgClass, NgIf} from "@angular/common";
import {ErrorStatusCode} from "../../models/error-state";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    NgIcon,
    NgClass,
    NgIf
  ],
  viewProviders: [provideIcons({
    hugePlugSocket,
    hugeSettingError03
  })],
  templateUrl: './error.component.html',
  styles: []
})
export default class ErrorComponent {

  private statusCode: number | undefined;
  protected hasCountDown: boolean = false;
  private targetTimestamp: number = Date.now() + 6000000;
  protected countdown: string = '00:00';
  private intervalId: any;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.statusCode = data['statusCode'];
      this.checkIfCountdown();
      if (this.hasCountDown) {
        this.startCountdown();
      }
    });
  }

  protected getCode(): string {
    return this.statusCode ? this.statusCode.toString() : '';
  }

  private checkIfCountdown(): void {
    this.hasCountDown = this.statusCode === ErrorStatusCode.ServiceUnavailable
  }

  private startCountdown(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private updateCountdown(): void {
    const now = Date.now();
    const distance = this.targetTimestamp - now;

    if (distance < 0) {
      this.countdown = '00:00';
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let countdown = '';
    if (days > 0) countdown += `${this.pad(days)}:`;
    if (hours > 0 || days > 0) countdown += `${this.pad(hours)}:`;
    countdown += `${this.pad(minutes)}:${this.pad(seconds)}`;

    this.countdown = countdown;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
