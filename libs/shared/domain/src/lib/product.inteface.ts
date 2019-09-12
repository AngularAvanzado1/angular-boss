export interface Product {
  _id: string;
  description: string;
  category: 'Computer' | 'Printer';
  brand: string;
  price: number;
  stock: number;
}
