import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {NotifyService} from "../../../../core/services/notify.service";

@Component({
  selector: 'home-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit{

  protected contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private notify: NotifyService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  protected submitForm(): void {
    this.notify.info('Send message', {timeOut: 3000});
    this.contactForm.controls['message'].setValue('');
  }

  protected isValid(): boolean {
    return this.contactForm.valid;
  }


}
