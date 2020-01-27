import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../core/shopping-cart.service';
import { ProductService } from './../core/product.service';
import { Product } from './../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product = new Product();
  isVisibleTable = false;

  constructor(private productService: ProductService,
    private shoppingCart: ShoppingCartService) { }
  
  ngOnInit() {
    let product = new Product();
    product.id = '2';
    this.getInfoProduct(product);
  }

  getInfoProduct(product: Product) {
    this.productService.getProductbyId(product.id)
      .subscribe(product => {
        this.product = product;
      });
  }

  showMeasureTable() {
    this.isVisibleTable = !this.isVisibleTable;
  }

  addProductShoppingCart() {
    this.shoppingCart.addToCart(this.product);
  }
}
