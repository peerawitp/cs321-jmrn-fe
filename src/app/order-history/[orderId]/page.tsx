"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { orderHistory } from "@/data/orderHistory"; // ดึงข้อมูลจาก orderHistory
import { findProductById } from "@/data/products"; // ใช้สำหรับค้นหาข้อมูลสินค้าจาก productId
import Image from "next/image";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  console.log(orderId)
  const router = useRouter();

  // ค้นหาคำสั่งซื้อที่ตรงกับ orderId
  const [order, setOrder] = useState(
    orderHistory.find((o) => o.orderId === orderId),
  );

  if (!order) {
    return <div className="min-h-screen p-8 text-center">Order not found</div>;
  }

  // ฟังก์ชันสำหรับยืนยันการรับสินค้า
  const confirmDelivery = () => {
    // ในการใช้งานจริง อาจจะต้องเรียก API เพื่อตั้งสถานะให้เป็น delivered
    setOrder({ ...order, status: "Delivered" });
    alert("Thank you for confirming the delivery!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Order #{order.orderId}
        </h1>
        <p className="text-lg text-center mb-6">
          Here are the details of your order.
        </p>

        {/* รายละเอียดคำสั่งซื้อ */}
        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p className="text-gray-700">Order Date: {order.date}</p>
          <p className="text-gray-700 mb-4">
            Total: {order.total.toFixed(2)} บาท
          </p>
          <p className="text-gray-700 mb-4">
            Status: <span className="font-semibold">{order.status}</span>
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Items in your order:</h3>
            <ul className="space-y-4">
              {order.items.map((item, index) => {
                const product = findProductById(item.productId); // ดึงข้อมูลสินค้าจาก productId
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

        {/* ข้อมูลการจัดส่ง */}
        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p>{order.shippingAddress.fullName}</p>
          <p>
            {order.shippingAddress.addressLine1},{" "}
            {order.shippingAddress.addressLine2}
          </p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>

        {/* ปุ่มยืนยันการรับสินค้าเฉพาะคำสั่งซื้อที่สถานะเป็น "Shipped" */}
        {order.status === "Shipped" && (
          <div className="text-center mt-4">
            <button
              onClick={confirmDelivery}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm Delivery
            </button>
          </div>
        )}

        {/* ปุ่มกลับไปยัง Order History */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/order-history")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
