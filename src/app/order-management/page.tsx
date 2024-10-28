"use client";

import React, { useEffect, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import useGetAllOrder from "@/api/employee/useGetAllOrder";
import { EmployeeOrder, Order, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";
import { signOut, useSession } from "next-auth/react";
import useUpdateOrderStatus from "@/api/employee/useUpdateOrderStatus";
import { useQueryClient } from "@tanstack/react-query";

const OrderManagement = () => {
  const [orders, setOrders] = useState<EmployeeOrder[]>();
  const [searchId, setSearchId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const [selectedOrder, setSelectedOrder] = useState<EmployeeOrder | null>(
    null,
  );
  const { data: session } = useSession();

  const { data: allOrders, isLoading } = useGetAllOrder();

  const queryClient = useQueryClient();
  const updateOrderStatusMutation = useUpdateOrderStatus();

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

  const handleViewOrder = (order: EmployeeOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    await updateOrderStatusMutation.mutateAsync(
      { orderId, status: newStatus },
      {
        onSuccess: () => {
          alert("Update status successfully!");
          queryClient.invalidateQueries({ queryKey: ["getAllOrder"] });
        },
        onError: (error) => {
          alert("An error occurred. " + error.message);
        },
      },
    );
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

    return filteredOrders.sort((a, b) => b.id - a.id);
  };

  const renderOrders = (filteredOrders: EmployeeOrder[]) => {
    // Filter orders to only include those with the desired statuses for STORE role
    const allowedStatuses = [
      "PREPARING",
      "SHIPPED",
      "SUCCESS",
    ] as OrderStatus[];
    const filteredForStore =
      session?.user?.role === "STORE"
        ? filteredOrders.filter((order) =>
            allowedStatuses.includes(order.status),
          )
        : filteredOrders;

    return filteredForStore.length > 0 ? (
      filteredForStore.map((order) => (
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
            All
          </button>
          {Object.values(OrderStatus)
            .filter((status) => {
              // Only allow STORE role to see PREPARING, SHIPPED, and SUCCEEDED statuses
              if (session?.user?.role === "STORE") {
                return ["PREPARING", "SHIPPED", "SUCCESS"].includes(status);
              }
              return true; // Allow all statuses for other roles
            })
            .map((status) => (
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
