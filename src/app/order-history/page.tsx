"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { orderHistory as initialOrderHistory } from "@/data/orderHistory";
import { findProductById } from "@/data/products"; // ฟังก์ชันสำหรับค้นหาสินค้าจาก productId

const OrderHistory: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState(initialOrderHistory);
  const router = useRouter();

  const confirmDelivery = (e: React.MouseEvent, orderId: string) => {
    // หยุดไม่ให้อีเวนต์การคลิกแพร่กระจายไปยังการ์ด
    e.stopPropagation();

    // อัปเดตสถานะคำสั่งซื้อใน orderHistory เป็น "Delivered"
    const updatedOrders = orderHistory.map((order) =>
      order.orderId === orderId ? { ...order, status: "Delivered" } : order
    );
    setOrderHistory(updatedOrders);
    alert("Thank you for confirming the delivery!");
  };

  const handleCardClick = (orderId: string) => {
    router.push(`/order-history/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>

        {orderHistory.length > 0 ? (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div
                key={order.orderId}
                className="bg-gray-50 p-6 rounded shadow cursor-pointer hover:bg-gray-100 transition duration-200"
                onClick={() => handleCardClick(order.orderId)} // เพิ่ม onClick เพื่อให้คลิกทั้ง card ได้
              >
                <h2 className="text-xl font-bold mb-2">
                  Order #{order.orderId}
                </h2>
                <p className="text-gray-700">Date: {order.date}</p>
                <p className="text-gray-700">
                  Total: {order.total.toFixed(2)} บาท
                </p>
                <p className="text-gray-700 mb-4">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Items:</h3>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => {
                      const product = findProductById(item.productId); // ดึงข้อมูลสินค้าจาก productId
                      const productSize = product?.sizes.find(
                        (size) => size.tireSize === item.size
                      );

                      // ตรวจสอบว่าข้อมูลสินค้ามีอยู่หรือไม่
                      if (!product || !productSize) {
                        return (
                          <li key={index}>Product information not found.</li>
                        );
                      }

                      return (
                        <li key={index}>
                          {product.name} ({item.size}) - Quantity: {item.quantity} - Price:{" "}
                          {productSize.price} บาท
                        </li>
                      );
                    })}
                  </ul>
                  {order.status === "Shipped" && (
                    <div className="relative mt-4">
                      <button
                        onClick={(e) => confirmDelivery(e, order.orderId)} // ส่งอีเวนต์และ orderId
                        className="absolute right-0 bottom-0 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Confirm Delivery
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
