import { ShoppingCartService } from './../core/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products = new Array<Product>();
  faShoppingCart = faShoppingCart;
  itemQuantity = 1;
  sumItems = 0;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    this.getItemsCart();
  }

  getItemsCart() {
    this.shoppingCart.getListItemsShoppingCartMapProducts()
      .subscribe(res => {
        this.products = res;
      })
  }

  deleteItem(product: Product) {
    this.shoppingCart.deleteProductShoppingCart(product.id);
  }

  incrementQuantity() {
    this.itemQuantity++;
  }

  decrementQuantity() {
    if (this.itemQuantity >= 2) {
      this.itemQuantity--;
    }
  }

  sumTotal(): string {
    let sumItems = 0;
    this.products.forEach((item) => {
      sumItems += (+item.price);
    });
    return sumItems.toFixed(2);
  }

}
