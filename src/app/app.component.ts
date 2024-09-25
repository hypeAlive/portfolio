import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {ToastrService} from "ngx-toastr";
import {ToastComponent} from "./core/components/toast/toast.component";
import {NotifyService} from "./core/services/notify.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor() { }

}
