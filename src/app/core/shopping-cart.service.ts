import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';

import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: Product) {
    if (!localStorage.getItem('cartId')) {
      let cart = await this.db.list('/shoppingCart').push({
        dateCreated: new Date().getTime()
      });
      localStorage.setItem('cartId', cart.key)
      this.addProductCart(cart.key, product)
      alert('Adicionado ao carrinho')
    }
    else {
      this.addProductCart(localStorage.getItem('cartId'), product);
    }
  }

  addProductCart(idCart, productAdd) {
    console.log("productAdd", productAdd);
    this.db.object('/shoppingCart/' + idCart + '/items/' + productAdd.key)
      .snapshotChanges()
      .pipe(
        take(1)
      ).subscribe(
        productCart => {
          if (!productCart.key) {
            productAdd.quantity = 1;
            this.db.list('/shoppingCart/' + idCart + '/items/').set(productAdd.key, { product: productAdd })
          }
        })
  }

  getListItemsShoppingCart() {
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(
        map(products =>
          products.map(c => (
            {
              key: c.payload.key, ...(c.payload.val() as any)
            }
          ))
        ))
  }

  deleteProductShoppingCart(id: string) {
    let cartId = localStorage.getItem('cartId');
    return this.db.object('/shoppingCart/' + cartId + '/items/' + id).remove();
  }

  getListItemsShoppingCartMapProducts() {
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(
        map(products =>
          products.map(c => (
            {
              key: c.payload.key, ...(c.payload.val() as any).product
            }
          ))
        ))
  }
}
