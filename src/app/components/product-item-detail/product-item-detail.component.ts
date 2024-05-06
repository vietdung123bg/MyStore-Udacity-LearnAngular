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
  numberOfItem: number = 1;

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

  onSubmit(product: Product, event: any): boolean {
    let newCartProduct: CartProduct[] = [];
    let message: string = '';

    const listProductsInCart: CartProduct[] =
      this.cartService.getProductOfCart();

    const chkProductInCart = this.cartService.checkProductInCart(product.id);

    newCartProduct = listProductsInCart;

    if (!chkProductInCart || newCartProduct.length === 0) {
      product.numberOfItem = this.numberOfItem;
      newCartProduct.push(product);
      this.cartService.addToCart(newCartProduct);
      message = `New Item '${product.name}' added to cart with ${this.numberOfItem} items`;
    } else {
      const productExists = newCartProduct.find((prod) => {
        return prod.id === product.id;
      });
      if (productExists) {
        const numberItem: number = productExists.numberOfItem;
        productExists.numberOfItem += this.numberOfItem;
        const idxOfProductInCart = newCartProduct.findIndex(
          (prod) => prod.id === productExists.id
        );
        newCartProduct.splice(idxOfProductInCart, 1);
        newCartProduct.splice(idxOfProductInCart, 0, productExists);
        this.cartService.addToCart(newCartProduct);
        message = `${numberItem} Item(s) of '${
          product.name
        }' already exist in cart. Will be updated to ${
          this.numberOfItem + numberItem
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
