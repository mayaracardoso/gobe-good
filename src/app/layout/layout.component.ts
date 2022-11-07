import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './../shared/models/product.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { tsNxLib } from 'nxlibts';
import { helloTsc } from 'hellotsc';
import { novoTesteDuo } from '@novotesteduo/novo-teste';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  searchResult = new Array<any>();
  constructor(private router: Router,
    private productService: ProductService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    tsNxLib();
    helloTsc();
    novoTesteDuo();
    this.productService.updateSearch.subscribe((res) => {
      this.searchResult = res;
    })
  }

  redirectTo(product: Product) {
    localStorage.setItem('productSelected', JSON.stringify(product));
    this.router.navigate(['/product-detail']);
  }

  saveQuestion() {
    return this.db.list('/questions-teste/').push({
     teste: 'esqueça tudo'
    })
  }

}
