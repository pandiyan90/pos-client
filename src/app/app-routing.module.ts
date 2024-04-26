import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/inventory/product/product.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

import { LoginComponent } from './components/auth/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren : () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
