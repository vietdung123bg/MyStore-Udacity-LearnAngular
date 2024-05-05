import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartOfProduct';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getProductOfCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartProducts.reduce((acc: number, pro: any) => {
      return acc + pro.price * Number(pro.numberOfItem);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  removeProductInCart(id: number) {
    const cartIdx = this.cartProducts
      ? this.cartProducts.findIndex((cart) => cart.id === id)
      : -1;
    if (cartIdx != -1 && this.cartProducts.length > 0) {
      this.cartProducts.splice(cartIdx, 1);
      this.cartService.addToCart(this.cartProducts);
      this.calculateTotalPrice();
    }
  }

  checkoutCart(fullName: string) {
    this.cartService.clearCart();
    this.route.navigateByUrl(`/checkout/${fullName}/${this.totalPrice}`);
  }
}
