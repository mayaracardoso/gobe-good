import { DeliveryService } from './../core/delivery.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ProductDetailComponent
  ],
  providers: [
    DeliveryService
  ]
})
export class ProductDetailModule { }
