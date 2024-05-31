import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { HttpClient } from '@angular/common/http';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject();

  product: Product = new Product();
  products: Product[] = [];

  // datasource: MatTableDataSource<Product>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // matColumns = ['id', 'code', 'name', 'description', 'type', 'purchasePrice', 'manufacturer', 'salePrice', 'unit', 'department', 'mrp', 'inventory'];

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    //this.loadMatTableData();
    this.loadAgTableData();
  }

  loadMatTableData() {
    this.productService.getProducts(1, 10, '', '', '').subscribe(resp => {
      //this.datasource = new MatTableDataSource(resp.payload)
    });
  }

  loadAgTableData() {
    this.dtOptions = {
      info: true,
      paging: true,
      destroy: true,
      serverSide: true,
      processing: true,
      lengthChange: true,
      searching: true,
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback) => {
        const pageNo = dataTablesParameters.start / dataTablesParameters.length + 1;
        const pageSize = dataTablesParameters.length;
        const search = dataTablesParameters.search.value;
        const sortBy = dataTablesParameters.columns[dataTablesParameters.order[0].column].data;
        const sortDir = dataTablesParameters.order[0].dir;

        this.productService.getProducts(pageNo, pageSize, search, sortBy, sortDir).subscribe(resp => {
          this.products = resp.payload;
          callback({
            recordsTotal: resp.totalRecords,
            recordsFiltered: resp.filteredRecords,
            data: this.products
          });
        });
      },
      columns: [
        { title: 'Code', data: 'code' },
        { title: 'Name', data: 'name' },
        { title: 'Type', data: 'type' },
        { title: 'Description', data: 'description' },
        { title: 'Purchase Price', data: 'purchasePrice' },
        { title: 'Sale Price', data: 'salePrice' },
        { title: 'Department', data: 'department' },
        { title: 'MRP', data: 'mrp' },
        { title: 'Inventory', data: 'inventory' }
      ]
    };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // race condition fails unit tests if dtOptions isn't sent with dtTrigger
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSelect(product: Product): void {
    this.product = product;
  }

  getProducts() {
    this.productService.getAllProducts()
      .subscribe(response => {
        this.products = response.payload;
        this.dtTrigger.next(this.dtOptions);
      });
  }

  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(() => {
        this.rerender();
        this.product = new Product();
      });
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(this.product)
      .subscribe(() => this.rerender());
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(() => this.rerender());
  }

  rerender(): void {
    //if (this.dtElement) {
      //this.dtElement.dtInstance.then((dtInstance: any) => {
        //dtInstance.destroy();
        //this.dtTrigger.next(this.p);
      //});
    //}
  }
}
