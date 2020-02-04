import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
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
    path: 'order', component: OrderComponent,
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
