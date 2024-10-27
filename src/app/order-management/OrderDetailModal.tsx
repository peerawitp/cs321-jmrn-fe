"use client";

import React, { useState } from "react";
import { MarketingOrder, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";
import Image from "next/image";

interface OrderDetailModalProps {
  order: MarketingOrder | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    order ? order.status : null,
  );

  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        <p className="mb-2">
          <strong>Order ID:</strong> {order.id}
        </p>
        <p className="mb-2">
          <strong>Customer Name:</strong> {order.user.firstName}{" "}
          {order.user.lastName}
        </p>
        <p className="mb-2">
          <strong>Customer Email:</strong> {order.user.email}
        </p>
        <p className="mb-2">
          <strong>Customer Phone:</strong> {order.user.phone}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {order.customerAddress.houseNumber},{" "}
          {order.customerAddress.village}, {order.customerAddress.street},{" "}
          {order.customerAddress.alley
            ? `Alley: ${order.customerAddress.alley}, `
            : ""}
          {order.customerAddress.subDistrict}, {order.customerAddress.district},{" "}
          {order.customerAddress.province}, Postal Code:{" "}
          {order.customerAddress.postalCode}, Country:{" "}
          {order.customerAddress.country}
        </p>
        <p className="mb-2">
          <strong>Total Price:</strong> {order.totalAmount} THB
        </p>
        <p className="mb-2">
          <strong>Status:</strong>
        </p>

        {/* Status Dropdown */}
        <select
          value={selectedStatus || order.status}
          onChange={handleStatusChange}
          className="border p-2 rounded mb-4 w-full"
          disabled={
            order.status === OrderStatus.WAITING_PAYMENT_CONFIRMATION ||
            order.status === OrderStatus.SUCCESS
          }
        >
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>
              {getOrderStatusText(status)}
            </option>
          ))}
        </select>

        {/* Show Payment Slip Image */}
        {order.status === OrderStatus.WAITING_PAYMENT_CONFIRMATION && (
          <div className="text-center">
            {!isImageLoaded && (
              <span className="text-center loading loading-spinner loading-md"></span>
            )}

            {/* Image */}
            <Image
              alt="Payment Slip"
              src={order.slipImageUrl!}
              width={1200}
              height={1200}
              onLoad={() => setIsImageLoaded(true)}
              className={`transition-opacity duration-500 rounded-md ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}

        <p className="mb-2">
          <strong>Created At:</strong> {order.createdAt.toLocaleString()}
        </p>

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
