import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../core/shopping-cart.service';
import { DeliveryService } from './../core/delivery.service';
import { Delivery } from './../shared/models/delivery.model';
import { Product } from './../shared/models/product.model';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product = new Product();
  isVisibleTable = false;
  cep: string;
  sizes = new Array<string>();
  sizeSelected: string;

  products = [];

  constructor(
    private shoppingCart: ShoppingCartService,
    private delivery: DeliveryService,
    private router: Router) {
  }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('productSelected'));
    this.sizes = ['P', 'M', 'G', 'GG', 'XG'];
  }

  showMeasureTable() {
    this.isVisibleTable = !this.isVisibleTable;
  }

  selectSize(size: string) {
    this.product.size = size;
    this.sizeSelected = size;
  }

  addProductShoppingCart() {
    this.shoppingCart.addToCart(this.product);
  }

  calculeShippin(cep: string) {
    let delivery = new Delivery();
    delivery.sCepDestino = cep;
    this.delivery.getFrete(delivery).subscribe((res) => {
      console.log('Res', res);
    });
  }

  goToOrder() {
    this.product.quantity = 1;
    this.products.push(this.product);
    localStorage.setItem('item', JSON.stringify(this.products));
    this.router.navigate(['/order']);
  }

}
