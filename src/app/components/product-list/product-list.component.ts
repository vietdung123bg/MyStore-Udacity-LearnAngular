import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product/product.service';
import { CartProduct } from '../../models/CartOfProduct';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  listNumberOfItem: number[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
      this.listNumberOfItem = new Array<number>(this.products.length).fill(1);
    });
  }

  onSubmit(product: CartProduct, event: any, index: any): boolean {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';

    const listProductsInCart: CartProduct[] =
      this.cartService.getProductOfCart();

    const chkProductInCart = this.cartService.checkProductInCart(index + 1);

    newCartProduct = listProductsInCart;

    if (!chkProductInCart || newCartProduct.length === 0) {
      product.numberOfItem = this.listNumberOfItem[index];
      newCartProduct.push(product);
      this.cartService.addToCart(newCartProduct);
      message = `New Item '${product.name}' added to cart with ${this.listNumberOfItem[index]} items`;
    } else {
      const productExists = newCartProduct.find((prod) => {
        return prod.id === index + 1;
      });

      if (productExists) {
        const numberItem: number = productExists.numberOfItem;
        productExists.numberOfItem += this.listNumberOfItem[index];
        const idxOfProductInCart = newCartProduct.findIndex(
          (prod) => prod.id === productExists.id
        );
        newCartProduct.splice(idxOfProductInCart, 1);
        newCartProduct.splice(idxOfProductInCart, 0, productExists);
        this.cartService.addToCart(newCartProduct);
        message = `${numberItem} Item(s) of '${
          product.name
        }' already exist in cart. Will be updated to ${
          this.listNumberOfItem[index] + numberItem
        } items`;
      }
    }

    alert(message);

    this.printLocalData(); // for debugging
    return false;
  }

  printLocalData(): void {
    console.log(this.cartService.getProductOfCart());
  }
}
