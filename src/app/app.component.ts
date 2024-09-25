import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {ToastrService} from "ngx-toastr";
import {ToastComponent} from "./core/components/toast/toast.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private toast: ToastrService) {
    this.toast.error('Welcome to my portfolio!', '', {
      timeOut: 10000,
      toastComponent: ToastComponent,
      positionClass: 'toast-bottom-right',
      toastClass: '',
      closeButton: true
    });
  }

}
