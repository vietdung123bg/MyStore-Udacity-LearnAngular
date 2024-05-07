import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  @Output() checkoutCartCreateForm: EventEmitter<string> = new EventEmitter();

  constructor() {}
  fullName: string = '';
  address: string = '';
  creditCard: string = '';
  checkValidCredit: boolean = true;
  alert: string = '';

  ngOnInit(): void {}
  onSubmit(): void {
    if (/^\d+$/.test(this.creditCard)) {
      this.checkoutCartCreateForm.emit(this.fullName);
    } else {
      this.checkValidCredit = false;
      this.alert = 'Credit Card is Invalid';
    }
  }
}
