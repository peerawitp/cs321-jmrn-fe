"use client";
import { useState } from "react";

interface CartButtonProps {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
}

const CartButton: React.FC<CartButtonProps> = ({ productId, productName, price, imageUrl }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // กำหนด state สำหรับเก็บข้อมูลสินค้าในตะกร้า

  // ฟังก์ชันสำหรับเพิ่มสินค้าในตะกร้า
  const addToCart = () => {
    const newCartItem = {
      productId,
      productName,
      price,
      imageUrl,
      quantity: 1, // เริ่มต้นจำนวนที่เพิ่มเข้ามาในตะกร้าเป็น 1
    };

    setCart((prevCart) => {
      // ตรวจสอบว่ามีสินค้านี้ในตะกร้าอยู่แล้วหรือไม่
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        // หากมีแล้ว เพิ่มจำนวนสินค้าในตะกร้า
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // หากยังไม่มี เพิ่มสินค้าลงในตะกร้า
        return [...prevCart, newCartItem];
      }
    });
  };

  return (
    <button
      onClick={addToCart}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Add to Cart
    </button>
  );
};

export default CartButton;

// TypeScript interface สำหรับสินค้าในตะกร้า
interface CartItem {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
