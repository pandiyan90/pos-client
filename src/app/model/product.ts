export class Product {
  id: number = 0;
  code!: string;
  name!: string;
  description!: string | null;
  type!: string;
  purchasePrice!: number;
  manufacturer!: string | null;
  salePrice!: number;
  unit!: string;
  department!: string;
  mrp!: number;
  inventory!: number;
  expirationDate!: Date | null;
  barcode!: string | null;
  supplier!: string | null;
  active!: boolean;
  deleted!: boolean;
  createdAt!: Date | null;
  updatedAt!: Date | null;
  createdBy!: string | null;
  updatedBy!: string | null;
}
