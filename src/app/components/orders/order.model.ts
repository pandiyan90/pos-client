export class Order {
    public orderNumber: number;
    public customerName: string;
    public customerAddress: string;
    public customerMobileNumber: number;
    public orderTotal: number;
    public orderDueDate: Date;

constructor(orderNumber: number, customerName: string, customerAddress: string,
            customerMobileNumber: number, orderTotal: number, orderDueDate: Date) {
      this.orderNumber = orderNumber;
      this.customerName = customerName;
      this.customerAddress = customerAddress;
      this.customerMobileNumber = customerMobileNumber;
      this.orderTotal = orderTotal;
      this.orderDueDate = orderDueDate;
    }
  }
