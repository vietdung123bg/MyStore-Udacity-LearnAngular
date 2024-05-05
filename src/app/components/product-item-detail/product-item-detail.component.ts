import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartOfProduct';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;
  numberOfItem: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
      this.product = this.getProductById(this.id);
      console.log(this.product);
    });
  }

  getProductById(id: number | null): Product {
    return this.products.filter((product) => product.id === id)[0];
  }

  onSubmit(cartProduct: Product, event: any): boolean {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';
    let isExistInCart: boolean = false;

    if (this.numberOfItem == null || this.numberOfItem <= 0) {
      this.numberOfItem = 1;
    }

    const cartProducts: CartProduct[] | [] =
      this.cartService.getProductOfCart();

    const cartIdx = cartProducts.findIndex(
      (cart) => cart.id === cartProduct.id
    );
    newCartProduct = cartProducts;

    if (cartIdx === -1 || cartProducts.length === 0) {
      newCartProduct.push(
        Object.assign(cartProduct, { numberOfItem: this.numberOfItem })
      );
      message = `New Item '${cartProduct.name}' added to cart with ${this.numberOfItem} items`;
    } else {
      const numberItem: number = newCartProduct[cartIdx].numberOfItem;
      isExistInCart = this.numberOfItem === numberItem;

      if (isExistInCart) {
        message = `${numberItem} Item(s) of '${cartProduct.name}' already exist in cart.`;
      } else {
        newCartProduct[cartIdx].id = cartProduct.id;
        newCartProduct[cartIdx].numberOfItem = this.numberOfItem;
        message = `${numberItem} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${this.numberOfItem}`;
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
