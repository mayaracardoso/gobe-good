import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { AngularFireStorageModule } from '@angular/fire/storage';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireStorageModule
  ]
})
export class ProductsModule { }
