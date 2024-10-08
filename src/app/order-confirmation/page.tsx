"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { orderDetails } from "@/data/orderDetails"; // ดึงข้อมูลจาก orderDetails
import { findProductById } from "@/data/products"; // ใช้สำหรับค้นหาข้อมูลสินค้าจาก productId
import Image from "next/image";

const OrderConfirmation: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Order Confirmation
        </h1>
        <p className="text-lg text-center mb-6">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        {/* รายละเอียดคำสั่งซื้อ */}
        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Order #{orderDetails.orderId}
          </h2>
          <p className="text-gray-700">Order Date: {orderDetails.date}</p>
          <p className="text-gray-700 mb-4">
            Total: {orderDetails.total.toFixed(2)} บาท
          </p>

          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p>{orderDetails.shippingAddress.fullName}</p>
          <p>
            {orderDetails.shippingAddress.addressLine1},{" "}
            {orderDetails.shippingAddress.addressLine2}
          </p>
          <p>
            {orderDetails.shippingAddress.city},{" "}
            {orderDetails.shippingAddress.state}{" "}
            {orderDetails.shippingAddress.postalCode}
          </p>
          <p>{orderDetails.shippingAddress.country}</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Items in your order:</h3>
            <ul className="space-y-4">
              {orderDetails.items.map((item, index) => {
                const product = findProductById(item.productId);
                const productSize = product?.sizes.find(
                  (size) => size.tireSize === item.size,
                );

                return (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={product?.imageUrl || ""}
                        alt={product?.name || ""}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      <div>
                        <p className="text-lg font-semibold">{product?.name}</p>
                        <p className="text-gray-600">Size: {item.size}</p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">
                      {(productSize?.price * item.quantity).toFixed(2)} บาท
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ปุ่มไปที่หน้า Order History */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/order-history")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
