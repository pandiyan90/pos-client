import { InvoiceItem } from "./invoice.item";

export interface Invoice {
    from: string;
    billingAddress: string;
    shippingAddress: string;
    authorized: string;
    vehicle: string;
    totalItems: number;
    totalQty: number;
    grossAmount: number;
    discountPercentage: number;
    sgst: number;
    cgst: number;
    igst: number;
    netAmount: number;
    items: InvoiceItem[];
}
