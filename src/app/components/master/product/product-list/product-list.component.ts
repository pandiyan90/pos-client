import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { TableColumn } from 'src/app/model/table.column';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  products: Product[] = [];
  totalRecords: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  searchTerm: string = '';

  dtTrigger: Subject<any> = new Subject<any>();
  searchSubject: Subject<string> = new Subject<string>();

  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: TableColumn[] = [
    { header: 'Code', field: 'code', dataType: 'string' },
    { header: 'Name', field: 'name', dataType: 'string' },
    { header: 'Description', field: 'description', dataType: 'string' },
    { header: 'Type', field: 'type', dataType: 'string' },
    { header: 'Purchase Price', field: 'purchasePrice', dataType: 'number' },
    { header: 'Sale Price', field: 'salePrice', dataType: 'number' },
    { header: 'Unit', field: 'unit', dataType: 'string' },
    { header: 'Department', field: 'department', dataType: 'string' },
    { header: 'MRP', field: 'mrp', dataType: 'number' },
    { header: 'Inventory', field: 'inventory', dataType: 'number' },
/** 
    { header: 'Manufacturer', field: 'manufacturer', dataType: 'string' },
    { header: 'Expiration Date', field: 'expirationDate', dataType: 'date' }, // Assuming expirationDate is a Date object
    { header: 'Barcode', field: 'barcode', dataType: 'string' },
    { header: 'Supplier', field: 'supplier', dataType: 'string' },
    { header: 'Active', field: 'active', dataType: 'boolean' },
    { header: 'Deleted', field: 'deleted', dataType: 'boolean' },
    { header: 'Created At', field: 'createdAt', dataType: 'date' }, // Assuming createdAt is a Date object
    { header: 'Updated At', field: 'updatedAt', dataType: 'date' }, // Assuming updatedAt is a Date object
    { header: 'Created By', field: 'createdBy', dataType: 'string' },
    { header: 'Updated By', field: 'updatedBy', dataType: 'string' },
*/
  ];

  matColumns: string[] = [...['slNo'], ...this.displayedColumns.map(c => c.field)];

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.matColumns.push('actions');
    console.log(this.matColumns);
    this.loadProducts();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.loadProducts(0, 10, searchTerm);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.searchSubject.unsubscribe();
  }

  getSlNo(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  loadProducts(page: number = this.currentPage, pageSize = this.pageSize, searchTerm = this.searchTerm, sortField = '', sortOrder = '') {
    console.log(searchTerm);
    this.productService.getProducts(page, pageSize, searchTerm, sortField, sortOrder).subscribe(resp => {
        this.dataSource = new MatTableDataSource(resp.payload);
        this.totalRecords = resp.totalRecords; // Update total items for pagination display
      });
  }

  onSearchTermChanged(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex; // Adjust for 0-based indexing
    this.pageSize = event.pageSize; // Update page size based on user selection
    this.loadProducts(this.currentPage, this.pageSize);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }

  onSelect(product: Product): void {
    this.product = product;
  }

  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(() => {
        this.loadProducts();
      });
  }

  editProduct(product: Product): void {
    this.productService.updateProduct(product)
      .subscribe(() => this.loadProducts());
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id)
      .subscribe(() => this.loadProducts());
  }

  rerender(): void {
    //if (this.dtElement) {
    //this.dtElement.dtInstance.then((dtInstance: any) => {
    //dtInstance.destroy();
    //this.dtTrigger.next(this.p);
    //});
    //}
  }

  refresh(): void {
    this.loadProducts();
  }

}

