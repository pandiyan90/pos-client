import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ListingBillComponent } from './components/listing-bill/listing-bill.component';
import { EditBillComponent } from './components/edit-bill/edit-bill.component';
import { BillComponent } from './components/bill/bill.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { MaterialModule } from './material.module';
import { MenuComponent } from './components/appmenu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OrdersComponent,
    NewOrderComponent,
    PageNotFoundComponent,
    FooterComponent,
    EditOrderComponent,
    ListingBillComponent,
    EditBillComponent,
    BillComponent,
    ProductComponent,
    CustomerListComponent,
    MenuComponent,
    FilterPipe,
    SorterPipe,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
