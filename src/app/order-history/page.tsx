"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useOrderHistory from "@/api/user/useOrderHistory";
import useProduct from "@/api/user/useProduct";

const OrderHistory: React.FC = () => {
  const router = useRouter();

  const { data: products } = useProduct();
  const { data: orderHistory, isLoading, error } = useOrderHistory();

  if (orderHistory) {
    console.log(orderHistory);
  }

  const confirmDelivery = (e: React.MouseEvent, orderId: number) => {
    e.stopPropagation();

    // อัปเดตสถานะคำสั่งซื้อใน orderHistory เป็น "Delivered"
    // const updatedOrders = orderHistory?.map((order) =>
    //   order.orderId === orderId ? { ...order, status: "Delivered" } : order,
    // );
    // setOrderHistory(updatedOrders);
    alert("Thank you for confirming the delivery!");
  };

  const handleCardClick = (orderId: number) => {
    router.push(`/order-history/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>

        {orderHistory && orderHistory.length > 0 ? (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-6 rounded shadow cursor-pointer hover:bg-gray-100 transition duration-200"
                onClick={() => handleCardClick(order.id)} // เพิ่ม onClick เพื่อให้คลิกทั้ง card ได้
              >
                <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
                <p className="text-gray-700">
                  Date: {order.createdAt.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  Total: {order.totalAmount.toFixed(2)} บาท
                </p>
                <p className="text-gray-700 mb-4">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Items:</h3>
                  <ul className="list-disc list-inside">
                    {order.orderItems.map((item, index) => {
                      const product = products?.find(
                        (product) => product.id === item.productId,
                      );

                      const productSize = product?.productSizes.find(
                        (size) => size.id === item.productSizeId,
                      );

                      // ตรวจสอบว่ามีสินค้าอยู่หรือไม่
                      if (!product || !productSize) {
                        return (
                          <li key={index}>Product information not found.</li>
                        );
                      }

                      return (
                        <li key={index}>
                          {product.name} ({productSize.name}) - Quantity:{" "}
                          {item.quantity} - Price: {productSize.price} บาท
                        </li>
                      );
                    })}
                  </ul>
                  {order.status === "SHIPPED" && (
                    <div className="relative mt-4">
                      <button
                        onClick={(e) => confirmDelivery(e, order.id)} // ส่งอีเวนต์และ orderId
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
