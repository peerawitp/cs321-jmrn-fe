"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "./types";
import { orders as initialOrders } from "./orders";
import OrderDetailModal from "./OrderDetailModal";

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchId, setSearchId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleStatusFilter = (status: OrderStatus | "") => {
    setSelectedStatus(status);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getFilteredOrders = () => {
    const trimmedSearchId = searchId.trim();
    let filteredOrders = [...orders];

    if (trimmedSearchId !== "") {
      const id = Number(trimmedSearchId);
      if (!Number.isNaN(id)) {
        filteredOrders = filteredOrders.filter((order) => order.id === id);
      } else {
        return [];
      }
    }

    if (selectedStatus) {
      filteredOrders = filteredOrders.filter((order) => order.status === selectedStatus);
    }

    return filteredOrders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const renderOrders = (filteredOrders: Order[]) => {
    return filteredOrders.length > 0 ? (
      filteredOrders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center p-4 bg-white rounded shadow mb-2"
        >
          {/* Left Side: Order ID and View Button */}
          <div className="w-1/4">
            <span className="block text-sm font-bold">Order ID: {order.id}</span>
            <button
              onClick={() => handleViewOrder(order)}
              className="mt-2 text-blue-500 text-sm"
            >
              View Order
            </button>
          </div>

          {/* Middle: Customer Name and Address */}
          <div className="flex flex-col items-center justify-center w-2/4 text-center">
            <span className="block text-sm font-bold">{order.customerName}</span>
            <span className="block text-xs text-gray-500">{order.address}</span>
          </div>

          {/* Right Side: Order Status */}
          <div className="w-1/4 flex flex-col items-end">
            <span className={`block text-sm font-bold ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div>No orders found.</div>
    );
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PAYMENT_PENDING:
        return "text-yellow-500";
      case OrderStatus.PREPARING:
        return "text-blue-500";
      case OrderStatus.SHIPPED:
        return "text-indigo-500";
      case OrderStatus.DELIVERED:
        return "text-green-500";
      case OrderStatus.CANCELLED:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
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
        
        {/* Status Filter Buttons */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleStatusFilter("")}
            className={`px-4 py-2 rounded ${
              selectedStatus === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            All Statuses
          </button>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`px-4 py-2 rounded ${
                selectedStatus === status ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {renderOrders(getFilteredOrders())}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default OrderManagement;
