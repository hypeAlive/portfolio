import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

export type NotifyOptions = {
  closeButton: boolean;
  timeOut: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toast: ToastrService) {
  }

  public success(message: string, opt: Partial<NotifyOptions>) {
    this.toast.success(message, '', opt);
  }

  public error(message: string, opt: Partial<NotifyOptions>) {
    this.toast.error(message, '', opt);
  }

  public info(message: string, opt: Partial<NotifyOptions>) {
    this.toast.info(message, '', opt);
  }

  public warning(message: string, opt: Partial<NotifyOptions>) {
    this.toast.warning(message, '', opt);
  }
}
