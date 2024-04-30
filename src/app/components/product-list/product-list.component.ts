import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;

  dtOptions: Config = {};
  dtTrigger:Subject<any> = new Subject<any>();
  products: Product[] = [];

  constructor(private productService: ProductService){}
 
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.products = this.productService.getProducts();
        callback({
          recordsTotal: this.products.length,
          recordsFiltered: 10,
          data: [],
        });
      },
      columns: [{
        width:"12%",
        data: 'product',
        searchable:false,
        orderable: true
      }, {
        width:"12%",
        data: 'mobile',
        searchable:false,
        orderable: true
      }, {
        width:"12%",
        data: 'city',
        searchable:false,
        orderable: true
      }]
    };
    this.dtTrigger.next(this.products);
  }

  private getProducts(){
    this.products = this.productService.getProducts();
    this.dtTrigger.next(this.products);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
