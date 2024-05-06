import { Injectable } from '@angular/core';
import { CartProduct } from '../../models/CartOfProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  myStorage = window.localStorage;

  constructor() {}

  addToCart(product: CartProduct[]): void {
    this.myStorage.setItem('cart', JSON.stringify(product));
  }

  getProductOfCart(): CartProduct[] | [] {
    const getProduct = this.myStorage.getItem('cart');
    return getProduct ? JSON.parse(getProduct) : [];
  }

  clearCart(): void {
    this.myStorage.clear();
  }

  checkProductInCart(id: number): boolean {
    const lstProductsInCart = this.getProductOfCart();
    if (lstProductsInCart.length != 0) {
      for (let i = 0; i < lstProductsInCart.length; i++) {
        if (lstProductsInCart[i].id == id) {
          return true;
        }
      }
    }
    return false;
  }
}
