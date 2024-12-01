import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {NotifyService} from "../../../../core/services/notify.service";
import {DirectusService} from "../../../../core/services/directus.service";
import {createItem} from "@directus/sdk";
import {FadeInDirective} from "../../../../shared/directives/fade-in.directive";
import {EffectColor} from "../../../../shared/models/effects.interface";
import {PointGradientComponent} from "../../../../shared/components/point-gradient/point-gradient.component";

@Component({
    selector: 'home-contact',
    imports: [
        ReactiveFormsModule,
        NgClass,
        FadeInDirective,
        PointGradientComponent
    ],
    templateUrl: './contact.component.html',
    styles: []
})
export class ContactComponent implements OnInit {

  protected contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private notify: NotifyService, private directus: DirectusService) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  protected submitForm(): void {
    this.directus.getRestClient()
      .request(createItem('Inbox', this.contactForm.value))
      .then(() => {
        this.notify.success('Message sent', {timeOut: 3000});
        this.contactForm.controls['message'].setValue('');
      })
      .catch(err => {
        console.log(err)
        this.notify.error('Failed to send message', {timeOut: 3000});
      });
  }

  protected isValid(): boolean {
    return this.contactForm.valid;
  }


  protected readonly PointColorGradient = EffectColor;
}
