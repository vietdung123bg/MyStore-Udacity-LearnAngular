import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  fullName: string | null = '';
  totalPrice: number = 0;
  state: Observable<any>;

  ngOnInit(): void {
    this.state = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state.subscribe((data) => {
      this.fullName = data['fullName'];
      this.totalPrice = data['totalPrice'];
    });
    console.log(this.totalPrice);
    console.log(this.fullName);
  }
}
