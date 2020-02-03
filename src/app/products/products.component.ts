import { AngularFireModule } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { Product } from '../shared/models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  categories: any;
  product = new Product();
  image: File;
  
  constructor(private productService: ProductService,
    private af: AngularFireModule, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  includeProduct() {
    this.productService.addProduct(this.product);
  }

  saveImageStorage() {

  }
}
