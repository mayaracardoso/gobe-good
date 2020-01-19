import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebase),
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
