import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

import { LoginComponent } from './components/auth/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ListingBillComponent } from './components/listing-bill/listing-bill.component';
import { EditBillComponent } from './components/edit-bill/edit-bill.component';
import { BillComponent } from './components/bill/bill.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { authGuard } from './guard/auth.guard';
import { MaterialModule } from './material.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'master',
    loadChildren: () =>
      import('./components/master/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    //canActivate: [ authGuard ]
  },
  {
    path: 'orders/:id',
    component: EditOrderComponent,
  },
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'bills',
    component: ListingBillComponent,
  },
  {
    path: 'bill/:id',
    component: EditBillComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [MaterialModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
