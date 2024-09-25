import { Component } from '@angular/core';
import {Toast, ToastPackage, ToastrService} from "ngx-toastr";
import {NgClass, NgIf} from "@angular/common";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'core-toast',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './toast.component.html',
  styles: []
})
export class ToastComponent extends Toast {

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
    private logger: NGXLogger
  ) {
    super(toastrService, toastPackage);
  }

  getType(): string {
    let type = 'unknown';
    try {
      type = this.toastPackage.toastType.split('-')[1];
    } catch (e) {
      this.logger.error(e);
    }
    return type;
  }

  isInfo(): boolean {
    return this.getType() === 'info';
  }

  isWarning(): boolean {
    return this.getType() === 'warning';
  }

  isSuccess(): boolean {
    return this.getType() === 'success';
  }

  isError(): boolean {
    return this.getType() === 'error';
  }

}
