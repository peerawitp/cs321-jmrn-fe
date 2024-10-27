"use client";

import React, { useEffect, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import useGetAllOrder from "@/api/marketing/useGetAllOrder";
import { MarketingOrder, Order, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";

const OrderManagement = () => {
  const [orders, setOrders] = useState<MarketingOrder[]>();
  const [searchId, setSearchId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const [selectedOrder, setSelectedOrder] = useState<MarketingOrder | null>(
    null,
  );

  const { data: allOrders, isLoading } = useGetAllOrder();

  if (allOrders) {
    console.log(allOrders);
  }

  useEffect(() => {
    if (allOrders) {
      setOrders(allOrders);
    }
  }, [allOrders]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleStatusFilter = (status: OrderStatus | "") => {
    setSelectedStatus(status);
  };

  const handleViewOrder = (order: MarketingOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders?.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getFilteredOrders = () => {
    if (!orders) return [];
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
      filteredOrders = filteredOrders.filter(
        (order) => order.status === selectedStatus,
      );
    }

    return filteredOrders.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  };

  const renderOrders = (filteredOrders: MarketingOrder[]) => {
    return filteredOrders.length > 0 ? (
      filteredOrders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center p-4 bg-white rounded shadow mb-2"
        >
          {/* Left Side: Order ID and View Button */}
          <div className="w-1/4">
            <span className="block text-sm font-bold">
              Order ID: {order.id}
            </span>
            <button
              onClick={() => handleViewOrder(order)}
              className="mt-2 text-blue-500 text-sm"
            >
              View Order
            </button>
          </div>

          {/* Middle: Customer Name and Address */}
          <div className="flex flex-col items-center justify-center w-2/4 text-center">
            <span className="block text-sm font-bold">
              {order.user.firstName} {order.user.lastName}
            </span>
            <span className="block text-xs text-gray-500">
              {order.customerAddress.houseNumber},{" "}
              {order.customerAddress.village}, {order.customerAddress.street},{" "}
              {order.customerAddress.alley
                ? `Alley: ${order.customerAddress.alley}, `
                : ""}
              {order.customerAddress.subDistrict},{" "}
              {order.customerAddress.district}, {order.customerAddress.province}
              , Postal Code: {order.customerAddress.postalCode}, Country:{" "}
              {order.customerAddress.country}
            </span>
          </div>

          {/* Right Side: Order Status */}
          <div className="w-1/4 flex flex-col items-end">
            <span
              className={`block text-sm font-bold ${getStatusColor(order.status)}`}
            >
              {getOrderStatusText(order.status)}
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
      case OrderStatus.WAITING_PAYMENT:
        return "text-yellow-500";
      case OrderStatus.WAITING_PAYMENT_CONFIRMATION:
        return "text-yellow-800";
      case OrderStatus.PREPARING:
        return "text-blue-500";
      case OrderStatus.SHIPPED:
        return "text-indigo-500";
      case OrderStatus.SUCCESS:
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
              selectedStatus === ""
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            ทั้งหมด
          </button>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`px-4 py-2 rounded ${
                selectedStatus === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {getOrderStatusText(status)}
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
