import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  updateSearch = new EventEmitter<any>();

  constructor(private db: AngularFireDatabase) {
  }

  getAllProducts() {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {
              key: c.payload.key, ...(c.payload.val() as any)
            }
          ))
        )
      )
  }

  addProduct(product: Product) {
    return this.db.list('/products/').push({
      categorie: product.categorie,
      description: product.description,
      price: product.price,
      urlImage: product.urlImage
    })
  }

  getProductbyId(id: string) {
    return this.db.object('/products/' + id)
      .snapshotChanges()
      .pipe(
        map(product => {
          let obj: any = product.payload.val();
          let productTemp: Product = {
            id: product.key,
            categorie: obj.categorie,
            description: obj.description,
            price: obj.price,
            urlImage: obj.urlImage
          }
          return productTemp
        })
      )
  }

  updateProduct(product: Product) {
    return this.db.object('/products/' + product.id).update({
      description: product.description,
      categorie: product.categorie,
      price: product.price,
      urlImage: product.urlImage
    })
  }

  deleteProduct(id: string) {
    return this.db.object('/products/' + id).remove();
  }

  searchProducts(name: string) {
    this.getAllProducts()
      .subscribe((res) => {
        const searchResult = res.filter((item) => {
          return item.description.includes(name);
        });
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
        this.updateSearch.emit(searchResult);
      });
  }

  getAllCategories() {
    return this.db.list('/categories/')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {
              key: c.payload.key, ...(c.payload.val() as any)
            }
          ))
        )
      )
  }

}
