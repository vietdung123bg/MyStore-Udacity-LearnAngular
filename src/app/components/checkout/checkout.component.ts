import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  fullName: string | null = '';
  totalPrice: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.fullName = data.get('fullName');
      this.totalPrice = Number(data.get('totalPrice'));
    });
  }
}
