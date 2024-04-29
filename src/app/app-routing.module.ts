import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/inventory/product/product.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

import { LoginComponent } from './components/auth/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ListingBillComponent } from './components/listing-bill/listing-bill.component';
import { EditBillComponent } from './components/edit-bill/edit-bill.component';
import { BillComponent } from './components/bill/bill.component';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren : () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'reports',
    loadChildren: () => import('./components/sales-report/sales-report.module').then(m => m.SalesReportModule)
  },
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
    path: 'orders/:id',
    component: EditOrderComponent
  },
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'bills',
    component: ListingBillComponent
  },
  {
    path: 'bill/:id',
    component: EditBillComponent
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
