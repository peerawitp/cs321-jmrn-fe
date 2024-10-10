"use client"; // Mark the component as a Client Component

import React, { useState } from "react";

enum OrderStatus {
  PAYMENT_PENDING = "Payment Pending",
  PAYMENT_CONFIRMED = "Payment Confirmed",
  PREPARING = "Preparing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

interface Order {
  id: number;
  customerName: string;
  address: string;
  status: OrderStatus;
  createdAt: Date; 
}

const orders: Order[] = [
  {
    id: 1,
    customerName: "Peerawit",
    address: "Victory Monument",
    status: OrderStatus.PAYMENT_PENDING,
    createdAt: new Date("2023-10-01T10:00:00"),
  },
  {
    id: 2,
    customerName: "Tanawat",
    address: "Rangsit",
    status: OrderStatus.PREPARING,
    createdAt: new Date("2023-10-03T12:00:00"),
  },
  {
    id: 3,
    customerName: "Nakorn",
    address: "Pinkao",
    status: OrderStatus.SHIPPED,
    createdAt: new Date("2023-10-02T14:00:00"),
  },
  {
    id: 4,
    customerName: "Narisara",
    address: "Phayathai",
    status: OrderStatus.DELIVERED,
    createdAt: new Date("2023-10-04T16:00:00"),
  },
];

const OrderManagement = () => {
  const [searchId, setSearchId] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const getFilteredOrders = () => {
    if (searchId.trim() === "") {
      return [...orders].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    const id = parseInt(searchId);
    if (isNaN(id)) return [];
    return orders.filter((order) => order.id === id);
  };

 const renderOrders = (filteredOrders: Order[]) => {
    return filteredOrders.length > 0 ? (
      filteredOrders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center p-4 bg-white rounded shadow mb-2"
        >
          {/* Left Side: Order ID and View Button*/}
          <div className="w-1/4">
            <span className="block text-sm font-bold">Order ID: {order.id}</span>
            <button className="mt-2 text-blue-500 text-sm">View Order</button>
          </div>

          {/* Middle: Customer Name and Address */}
          <div className="flex flex-col items-center justify-center w-2/4 text-center">
            <span className="block text-sm font-bold">{order.customerName}</span>
            <span className="block text-xs text-gray-500">{order.address}</span>
          </div>

          {/* Right Side: Order Status */}
          <div className="w-1/4 flex flex-col items-end">
            <span className="block text-sm font-bold">{order.status}</span>
          </div>
        </div>
      ))
    ) : (
      <div>No orders found.</div>
    );
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchId}
          onChange={handleSearchChange}
          placeholder="Search by Order ID"
          className="border rounded p-2 w-full mb-4"
        />
        {renderOrders(getFilteredOrders())}
      </div>
    </div>
  );
};

export default OrderManagement;
