import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  {
    path: 'product-detail', component: ProductDetailComponent,
  },
  {
    path: 'products', component: ProductsComponent,
  },
  {
    path: 'user/login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
