// cartItem.ts
export interface CartItem {
  productId: number;
  size: string;  // ขนาดของสินค้า
  quantity: number;  // จำนวนสินค้าในตะกร้า
}

// ตัวอย่างข้อมูลสินค้าในตะกร้า
export const initialCart: CartItem[] = [
  {
    productId: 1,
    size: "120/70 ZR17",
    quantity: 2,
  },
  {
    productId: 2,
    size: "180/55 ZR17",
    quantity: 1,
  }
];
