import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Product } from '../shared/models/product.model';
import { ShoppingCartService } from './../core/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products = new Array<Product>();
  faShoppingCart = faShoppingCart;
  sumItems = 0;
  productSelected = new Product();

  constructor(private shoppingCart: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.getItemsCart();
    this.productSelected.quantity = 1;
  }

  getItemsCart() {
    this.shoppingCart.getListItemsShoppingCartMapProducts()
      .subscribe(res => {
        this.products = res;
      })
  }

  deleteItem(product) {
    this.shoppingCart.deleteProductShoppingCart(product.key);
  }

  incrementQuantity(product: Product) {
    product.quantity++;
  }

  decrementQuantity(product: Product) {
    if (product.quantity >= 2) {
      product.quantity--;
    }
  }

  sumTotal(): string {
    let sumItems = 0;
    this.products.forEach((item) => {
      sumItems += (+item.price * item.quantity);
    });
    return sumItems.toFixed(2);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToBuyItem(product: Product) {
    let products = [];
    localStorage.setItem('item', JSON.stringify(products))
    this.router.navigate(['/order']);
  }

  goToOrder() {
    localStorage.setItem('item', JSON.stringify(this.products))
    this.router.navigate(['/order']);
  }

}
