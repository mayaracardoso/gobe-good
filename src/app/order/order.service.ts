import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  createOrder(order) {
    return this.db.list('/orders').push(order);
  }

  getOrderIdByUserId(userId: string) {
    return this.db.list('/orders/', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(idOrders => {
          return idOrders.map(ids => {
            return ids.key
          })
        })
      )
  }
  getProductsByIdOrder(idOrder: string) {
    return this.db.object('/orders/' + idOrder + '/items/')
      .snapshotChanges()
      .pipe(
        map(products => {
          return products.payload.val();
        })
      )
  }
}
