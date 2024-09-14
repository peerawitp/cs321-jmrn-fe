"use client";
import React, { useState } from 'react';

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCart: CartItem[] = [
  {
    productId: 1,
    productName: 'Motorcycle Tire - 120/70-17',
    price: 600.25,
    quantity: 2,
    imageUrl: '/images/tire-120-70-17.jpg',
  },
  {
    productId: 2,
    productName: 'Motorcycle Tire - 180/55-17',
    price: 900.37,
    quantity: 1,
    imageUrl: '/images/tire-180-55-17.jpg',
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  // ฟังก์ชันสำหรับคำนวณราคารวม
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
  const increaseQuantity = (productId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ฟังก์ชันสำหรับลดจำนวนสินค้า
  const decreaseQuantity = (productId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  const removeItem = (productId: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.productId !== productId));
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
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-50 rounded shadow">
                  <div className="flex items-center space-x-4">
                    {/* แสดงรูปภาพสินค้า */}
                    <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-bold">{item.productName}</h3>
                      <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* เพิ่ม/ลดจำนวนสินค้า */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* ปุ่มลบสินค้า */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* ราคารวม */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">Total: ${calculateTotalPrice().toFixed(2)}</p>
              <button className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
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
