import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';

import { ProductComponent } from './product/product.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsummaryComponent } from './productsummary/productsummary.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductaddComponent,
    ProductlistComponent,
    ProductsummaryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
