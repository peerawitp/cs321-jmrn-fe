export interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }
  
export const initialCart: CartItem[] = [
    {
      productId: 1,
      productName: 'Motorcycle Tire - 120/70-17',
      price: 600.25,
      quantity: 2,
      imageUrl: '/images/product2.jpg',
    },
    {
      productId: 2,
      productName: 'Motorcycle Tire - 180/55-17',
      price: 900.37,
      quantity: 1,
      imageUrl: '/images/product2.jpg',
    },
  ];