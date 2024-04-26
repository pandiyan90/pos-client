import { Component, OnInit } from '@angular/core';

import { Products } from './product.model';

import { productData } from './data';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

/**
 * Products component - handling the products with sidebar and content
 */
export class ProductComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}> = [];
  term: any;
  productData: Products[] = [];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'eCommerce', path: '/' }, { label: 'Products', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches product values
   */
  private _fetchData() {
    this.productData = productData;
  }
}
