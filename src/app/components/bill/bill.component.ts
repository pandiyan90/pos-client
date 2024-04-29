import { Component } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  itemName!: string;
  itemPrice!: number;
  itemQuantity!: number;
  items: { name: string, price: number, quantity: number }[] = [];

  addItem() {
    // Add item to the list
    this.items.push({ name: this.itemName, price: this.itemPrice, quantity: this.itemQuantity });
  }

  calculateSubtotal(): number {
    // Calculate subtotal
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  calculateTax(): number {
    // Calculate tax (10%)
    return this.calculateSubtotal() * 0.1;
  }

  calculateTotal(): number {
    // Calculate total (subtotal + tax)
    return this.calculateSubtotal() + this.calculateTax();
  }

  processPayment() {
    // Logic to process payment
    console.log('Payment processed!');
  }
}
