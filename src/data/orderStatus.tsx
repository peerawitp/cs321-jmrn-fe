// กำหนด interface สำหรับรายการสินค้า (Item)
export interface Item {
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderStatus {
  orderId: number;
  date: string;
  status: string;
  total: number;
  items: Item[];  
}

// ตัวอย่างข้อมูลคำสั่งซื้อ
export const orderStatus: OrderStatus[] = [
  {
    orderId: 1,
    date: '2023-09-01',
    status: 'Delivered',
    total: 1200.50,
    items: [
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' },
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' },
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' }
    ],
  },
  {
    orderId: 2,
    date: '2023-08-20',
    status: 'Shipped',
    total: 1800.75,
    items: [
      { productName: 'Motorcycle Tire - 180/55-17', quantity: 2, price: 900.37, imageUrl: '/images/product2.jpg' },
    ],
  },
];
