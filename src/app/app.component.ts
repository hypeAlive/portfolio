import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {NotifyService} from "./core/services/notify.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CoreModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(private notify: NotifyService) {
  }

  ngOnInit() {
  }

}
