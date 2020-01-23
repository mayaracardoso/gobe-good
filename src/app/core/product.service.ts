import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  getAllProducts() {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {
              key: c.payload.key, ...c.payload as {}
            }
          ))
        )
      )
  }
}
