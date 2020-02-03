import { Product } from './../shared/models/product.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  searchResult = new Array<any>();
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.updateSearch.subscribe((res) => {
       this.searchResult = res;
    })
  }

  redirectTo(product: Product) {
    localStorage.setItem('productSelected', JSON.stringify(product));
    this.router.navigate(['/product-detail']);
  }
}
