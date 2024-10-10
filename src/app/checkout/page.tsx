"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initialCart, CartItem } from "@/data/cartItem"; // ดึงข้อมูล CartItem
import { findProductById } from "@/data/products"; // ดึงข้อมูล products
import addressData from "@/data/addressData"; // ดึงข้อมูลที่อยู่

const CheckoutPage: React.FC = () => {
  const [cartItems] = useState<CartItem[]>(initialCart); // ใช้ initialCart สำหรับรายการสินค้าในตะกร้า
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null); // เก็บข้อมูลที่อยู่ที่เลือก
  const router = useRouter();

  // ฟังก์ชันคำนวณราคารวม
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = findProductById(item.productId);
      return product ? total + product.sizes[0].price * item.quantity : total;
    }, 0);
  };

  // ฟังก์ชันจัดการการเลือกที่อยู่
  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* ถ้าตะกร้าว่าง */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">No items in your cart.</p>
        ) : (
          <>
            {/* แสดงที่อยู่สำหรับการจัดส่ง */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Select Shipping Address:</h2>
              <select
                onChange={handleAddressChange}
                value={selectedAddress || ""}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an address</option>
                {addressData.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.houseNumber} {address.village && `${address.village}`}, {address.alley && `${address.alley}`}, {address.street}, {address.subDistrict}, {address.district}, {address.province}, {address.postalCode}
                  </option>
                ))}
              </select>

              {/* แสดงรายละเอียดที่อยู่ที่เลือก */}
              {selectedAddress && (
                <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                  {addressData
                    .filter((address) => address.id === selectedAddress)
                    .map((address) => (
                      <div key={address.id}>
                        <p><strong>Address:</strong></p>
                        <p>{address.houseNumber} {address.village && `${address.village}`}</p>
                        {address.alley && <p>Alley: {address.alley}</p>}
                        <p>Street: {address.street}</p>
                        <p>Sub Distruct: {address.subDistrict}, District: {address.district}, Province: {address.province}</p>
                        <p>Postal Code: {address.postalCode}</p>
                        <p>Country: {address.country}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* แสดงรายการสินค้า */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = findProductById(item.productId);
                if (!product) return null; // ถ้าไม่เจอสินค้าก็ไม่แสดง
                const productSize = product.sizes[0]; // ขนาดสินค้า

                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
                  >
                    <div className="flex items-center space-x-4">
                      {/* แสดงรูปภาพสินค้า */}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">
                          Tire Size: {productSize.tireSize}
                        </p>
                        <p className="text-gray-600">
                          Price: {productSize.price.toFixed(2)} บาท
                        </p>
                      </div>
                    </div>

                    {/* แสดงจำนวนสินค้า */}
                    <div className="text-gray-700">
                      Quantity: {item.quantity}
                    </div>

                    {/* ราคารวมต่อสินค้า */}
                    <div className="text-gray-700 font-semibold">
                      Total: {(productSize.price * item.quantity).toFixed(2)} บาท
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ราคารวมทั้งหมด */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Total: {calculateTotalPrice().toFixed(2)} บาท
              </p>
              <button
                className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => router.push("/order-confirmation")}
              >
                Confirm Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
