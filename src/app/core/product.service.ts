import { configFirebase } from './../../environments/environment.firebase';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { FireSQL } from 'firesql';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  fireSQL: FireSQL;

  constructor(private db: AngularFireDatabase) {
    // firebase.initializeApp(configFirebase);
    this.fireSQL = new FireSQL(firebase.firestore());
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

  getProductByName(name: string) {
    // const ref =this.db.database.ref("products");
    // ref.orderByKey().on("child_added", function (snapshot) {
    //   console.log(snapshot.key);
    // });

    // Attach an asynchronous callback to read the data at our posts reference
    const ref = this.db.database.ref("products");
    let searchResult;
    ref.on("value", function (snapshot) {
      console.log(snapshot.val());
      searchResult = snapshot.val().filter((item) => {
        return item.description.includes(name);
      })
      localStorage.setItem('searchResult', JSON.stringify(searchResult));
      console.log(searchResult);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    // const db = firebase.database().ref();
    // const events = db.child('products');
    // const query = events.orderByChild('description')
    // query.on('value', snap => {
    //   console.log(snap.val());
      
    // });

    // const db = firebase.database().ref().child('products').orderByChild('description').startAt('camiseta');
    // console.log(db);
   
  }

  consultaComWhere() {
    const cidades = this.fireSQL.query(`
    SELECT  *
    FROM products
    Where description LIKE 'camiseta%'
    `);
    cidades.then(lista => {
      for (let produto of lista) {
        console.log(`${produto.description}`)
      }
    })
  }


  updateProduct(product: Product) {
    return this.db.object('/products/' + product.id).update({
      description: product.description,
      categorie: product.categorie,
      price: product.price,
      urlImage: product.urlImage
    })
  }

  deleteCourse(id: string) {
    return this.db.object('/products/' + id).remove();
  }

}
