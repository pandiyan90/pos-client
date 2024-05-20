import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  invoice = {
    from: '',
    billingAddress: '',
    shippingAddress: '',
    authorized: '',
    vehicle: '',
    discountPercentage: 0,
    items: [
      { product: { code: 'P001', name: 'Product 1' }, quantity: 1, price: 100, totalPrice: 100, department: 'Dept 1' },
      { product: { code: 'P002', name: 'Product 2' }, quantity: 2, price: 150, totalPrice: 300, department: 'Dept 2' }
    ]
  };
  searchTerm: string = '';

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private billService: BillService) {
    this.itemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: [{ value: 0, disabled: true }],
      quantity: [1, Validators.required],
      totalPrice: [{ value: 0, disabled: true }]
    });
  }

  calculateTotalItems() {
    return this.invoice.items.length;
  }

  calculateTotalQuantity() {
    return this.invoice.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  calculateGrossAmount() {
    return this.invoice.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  calculateTax() {
    return this.calculateGrossAmount() * 0.1;
  }

  calculateNetAmount() {
    const gross = this.calculateGrossAmount();
    const discount = (this.invoice.discountPercentage / 100) * gross;
    const tax = this.calculateTax();
    return gross - discount + tax;
  }

  addItem() {
    const item = this.itemForm.value;
    item.totalPrice = item.quantity * item.price;
    this.invoice.items.push(item);
    this.itemForm.reset();
  }

  filteredItems() {
    if (!this.searchTerm) {
      return this.invoice.items;
    }
    return this.invoice.items.filter(item => 
      item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  saveData(data: any): void {
    this.billService.saveData(data).subscribe(
      response => {
        console.log('Data saved successfully:', response);
        // Optionally handle success response
      },
      error => {
        console.error('Error saving data:', error);
        // Optionally handle error response
      }
    );
  }

}
