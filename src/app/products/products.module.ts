import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductsModule { }
