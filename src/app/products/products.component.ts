import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { UploadService } from '../product/upload.service';
import { Product } from '../shared/models/product.model';
import { UploadFile } from './../product/upload-file';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: any;
  product = new Product();
  selectedFiles: FileList;
  currentUpload: UploadFile;
  imageName: string;

  constructor(private productService: ProductService, private upSvc: UploadService) { }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  includeProduct() {
    this.product.urlImage = this.upSvc.uploadFile.url;
    this.product.description = this.product.description.toLowerCase();
    this.productService.addProduct(this.product);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    console.log("event", event);
    this.imageName = this.selectedFiles.item(0).name;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new UploadFile(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  disabledButton(): boolean {
    if(!this.product.description ||
      !this.product.categorie ||
      !this.product.price || 
      !this.selectedFiles){
        return true;
      } else {
        return false;
      }
  }
}
