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
  creditCard: number | string = '';

  ngOnInit(): void {}
  onSubmit(): void {
    this.checkoutCartCreateForm.emit(this.fullName);
  }
}
