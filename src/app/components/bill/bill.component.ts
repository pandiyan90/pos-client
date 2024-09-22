import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceItem } from 'src/app/model/invoice.item';
import { Product } from 'src/app/model/product';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  invoice: Invoice = {
    from: '',
    billingAddress: '',
    shippingAddress: '',
    authorized: '',
    vehicle: '',
    totalItems: 0,
    totalQty: 0,
    grossAmount: 0,
    discountPercentage: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    netAmount: 0,
    items: [], // Initialize items as an empty array
  };
  searchTerm = '';
  searchProduct: Subject<string> = new Subject<string>();

  products: Product[] = [];
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private productService: ProductService,
  ) {
    this.itemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [{ value: 0, disabled: true }],
      totalPrice: [{ value: 0, disabled: true }],
      department: '',
    });
  }

  ngOnInit(): void {
    this.searchProduct
      .pipe(debounceTime(1000)) // Wait for 1 second after the last event before emitting
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.searchProducts(searchTerm);
        }
      });
  }

  searchProducts(name: string) {
    this.productService.searchProducts(name).subscribe((resp) => {
      this.products = resp.payload;
    });
  }

  onProductSearch(event: { term: string }): void {
    if (event.term.length > 2) {
      this.searchProducts(event.term);
    }
  }

  onProductSelect(event: any): void {
    const selectedProduct = this.products.find(
      (product) => product.name === event,
    );
    if (selectedProduct) {
      this.itemForm.patchValue({
        code: selectedProduct.code,
        price: selectedProduct.mrp,
        department: selectedProduct.department,
      });
    }
  }

  onCodeChange(event: any) {
    const id = event.target.value;
    if (id) {
      this.productService.getProduct(id).subscribe((resp) => {
        const product = resp.payload;
        this.itemForm.patchValue({
          name: product.name,
          price: product.mrp,
          department: product.department,
        });
      });
    }
  }

  calculateTotalItems() {
    this.invoice.totalItems = this.invoice.items.length;
    return this.invoice.totalItems;
  }

  calculateTotalQuantity() {
    this.invoice.totalQty = this.invoice.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    return this.invoice.totalQty;
  }

  calculateGrossAmount() {
    this.invoice.grossAmount = this.invoice.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    return this.invoice.grossAmount;
  }

  calculateTax() {
    return this.calculateGrossAmount() * 0.1;
  }

  calculateNetAmount() {
    const discount =
      (this.invoice.discountPercentage / 100) * this.invoice.grossAmount;
    const tax = this.calculateTax();
    this.invoice.netAmount = this.invoice.grossAmount - discount + tax;
    return this.invoice.netAmount;
  }

  updateTotalPrice() {
    this.itemForm
      .get('totalPrice')
      ?.setValue(
        this.itemForm.get('price')?.value *
          this.itemForm.get('quantity')?.value,
      );
  }

  addItem() {
    const item = this.itemForm.value;
    console.log(item);

    if (item.quantity > 0) {
      item.price = this.itemForm.get('price')?.value;
      // Ensure totalPrice is calculated before adding the item
      item.totalPrice = item.price * item.quantity;

      const existingItemIndex = this.invoice.items.findIndex(
        (existingItem) => existingItem.code === item.code,
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity and total price
        this.invoice.items[existingItemIndex].quantity += item.quantity;
        this.invoice.items[existingItemIndex].totalPrice =
          this.invoice.items[existingItemIndex].quantity *
          this.invoice.items[existingItemIndex].price;
      } else {
        // If the item doesn't exist, add it to the invoice
        this.invoice.items.push(item);
      }

      this.itemForm.reset();
    }
  }

  filteredItems() {
    if (!this.searchTerm) {
      return this.invoice.items;
    }
    return this.invoice.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  updateItemQuantity(item: InvoiceItem) {
    // Recalculate total price based on updated quantity
    item.totalPrice = item.price * item.quantity;
  }

  saveInvoice(data?: any): void {
    this.invoiceService.saveInvoice(data).subscribe(
      (response) => {
        console.log('Data saved successfully:', response);
        // Optionally handle success response
      },
      (error) => {
        console.error('Error saving data:', error);
        // Optionally handle error response
      },
    );
  }

  toQuantityEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Prevent form submission
      event.preventDefault();

      if (
        this.itemForm.get('name')?.value ||
        this.itemForm.get('code')?.value
      ) {
        // Focus the "Quantity" field
        document.getElementById('quantity')?.focus();
      }
    }
  }

  resetForm() {
    this.itemForm.reset();
    // Any additional reset logic
  }
}
