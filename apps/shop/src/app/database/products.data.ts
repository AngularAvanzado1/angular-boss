export enum Categories {
  Computer = 'Computer',
  Printer = 'Printer'
}
export interface Product {
  _id: string;
  description: string;
  category: Categories;
  brand: string;
  price: number;
  stock: number;
}
export const PRODUCTS: Product[] = [
  {
    _id: 'A-1',
    description: 'iMac',
    category: Categories.Computer,
    brand: 'Apple',
    price: 3000,
    stock: 10
  },
  {
    _id: 'MS-2',
    description: 'Surface',
    category: Categories.Computer,
    brand: 'Microsoft',
    price: 1500,
    stock: 20
  },
  {
    _id: 'HP-3',
    description: 'Hp Deskjet',
    category: Categories.Printer,
    brand: 'HP',
    price: 500,
    stock: 50
  },
  {
    _id: 'HP-4',
    description: 'Pavilion',
    category: Categories.Computer,
    brand: 'HP',
    price: 1000,
    stock: 20
  },
  {
    _id: 'C-5',
    description: 'Pixma',
    category: Categories.Printer,
    brand: 'Canon',
    price: 200,
    stock: 50
  },
  {
    _id: 'D-6',
    description: 'OptiPlex',
    category: Categories.Computer,
    brand: 'Dell',
    price: 1000,
    stock: 5
  }
];
