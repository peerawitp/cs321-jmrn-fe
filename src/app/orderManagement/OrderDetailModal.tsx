"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "./types";

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    order ? order.status : null
  );

  if (!order) {
    return null;
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as OrderStatus);
  };

  const handleConfirm = () => {
    if (selectedStatus && selectedStatus !== order.status) {
      onUpdateStatus(order.id, selectedStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
        <p className="mb-2"><strong>Customer Name:</strong> {order.customerName}</p>
        <p className="mb-2"><strong>Address:</strong> {order.address}</p>
        <p className="mb-2"><strong>Status:</strong></p>
        
        {/* Status Dropdown */}
        <select
          value={selectedStatus || order.status}
          onChange={handleStatusChange}
          className="border p-2 rounded mb-4 w-full"
        >
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <p className="mb-2"><strong>Created At:</strong> {order.createdAt.toLocaleString()}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
