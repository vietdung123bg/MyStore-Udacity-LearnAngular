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

  onSubmit(product: Product, event: any): boolean {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';
    let isExistInCart: boolean = false;

    const listProducts: CartProduct[] | [] =
      this.cartService.getProductOfCart();

    const productIndex = listProducts.findIndex(
      (prod) => prod.id === product.id
    );
    newCartProduct = listProducts;

    if (productIndex === -1 || newCartProduct.length === 0) {
      newCartProduct.push(
        Object.assign(product, { numberOfItem: this.listNumberOfItem[0] })
      );
      message = `New Item '${product.name}' added to cart with ${this.listNumberOfItem[0]} items`;
    } else {
      const numberItem: number = newCartProduct[productIndex].numberOfItem;
      isExistInCart = numberItem === this.listNumberOfItem[productIndex];

      if (isExistInCart) {
        message = `${numberItem} Item(s) of '${product.name}' already exist in cart.`;
        console.log(product);
      } else {
        newCartProduct[productIndex].id = product.id;
        newCartProduct[productIndex].numberOfItem =
          this.listNumberOfItem[productIndex];
        console.log(product);
        message = `${numberItem} Item(s) of '${product.name}' already exist in cart. Will be updated to ${this.listNumberOfItem[productIndex]}`;
      }
    }

    !isExistInCart ? this.cartService.addToCart(newCartProduct) : null;

    alert(message);

    this.printLocalData(); // for debugging
    return false;
  }

  printLocalData(): void {
    console.log(this.cartService.getProductOfCart());
  }
}
