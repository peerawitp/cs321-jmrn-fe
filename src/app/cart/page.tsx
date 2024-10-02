"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { initialCart, CartItem } from "@/data/cartItem";
import { findProductById } from "@/data/products";
import CartItemUpdater from '../components/CartItemUpdater';  // นำเข้าคอมโพเนนต์ที่สร้างใหม่

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart); // ใช้ข้อมูลตะกร้าเริ่มต้นจาก cartItem.ts
  const router = useRouter();

  // ฟังก์ชันสำหรับคำนวณราคารวมทั้งหมด
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = findProductById(item.productId); // ค้นหาสินค้าตาม productId
      const sizeInfo = product?.sizes.find((size) => size.tireSize === item.size); // ค้นหาขนาดสินค้า
      return sizeInfo ? total + sizeInfo.price * item.quantity : total; // คำนวณราคาตามจำนวนสินค้า
    }, 0);
  };

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้าในตะกร้า
  const increaseQuantity = (productId: number, size: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ฟังก์ชันสำหรับลดจำนวนสินค้าในตะกร้า
  const decreaseQuantity = (productId: number, size: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {/* ถ้าตะกร้าว่าง */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* แสดงรายการสินค้าในตะกร้า */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = findProductById(item.productId); // ค้นหาสินค้าตาม productId
                if (!product) return null; // ถ้าไม่เจอสินค้าก็ข้ามไป
                const productSize = product.sizes.find((size) => size.tireSize === item.size); // ขนาดสินค้า

                return (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between p-4 bg-gray-50 rounded shadow">
                    <div className="flex items-center space-x-4">
                      {/* แสดงชื่อสินค้าและขนาด */}
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">Size: {item.size}</p>
                      </div>
                    </div>

                    {/* ใช้งานคอมโพเนนต์ CartItemUpdater */}
                    <CartItemUpdater
                      productId={item.productId}
                      size={item.size}
                      quantity={item.quantity}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />

                    {/* แสดงราคาสินค้าตามขนาด */}
                    <div className="text-right">
                      {productSize && (
                        <p className="text-gray-600">Price: ${productSize.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ราคารวมทั้งหมด */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">Total: ${calculateTotalPrice().toFixed(2)}</p>
              <button
                onClick={() => router.push('/checkout')}
                className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Checkout   
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
