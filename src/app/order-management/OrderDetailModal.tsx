"use client";

import React, { useState } from "react";
import { EmployeeOrder, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";
import Image from "next/image";
import useVerifySlip from "@/api/employee/useConfirmSlip";
import { useQueryClient } from "@tanstack/react-query";
import useProduct from "@/api/user/useProduct";
import { Product } from "@/interfaces/Product";
import { useSession } from "next-auth/react";
import {
  marketingAllowedOrderStatus,
  storeAllowedOrderStatus,
} from "@/lib/allowOrderStatus";

interface OrderDetailModalProps {
  order: EmployeeOrder | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  const verifySlipMutation = useVerifySlip();
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useProduct();

  const session = useSession();

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

  const handleVerifySlip = async (status: boolean) => {
    await verifySlipMutation.mutateAsync(
      { orderId: order.id, status },
      {
        onSuccess: () => {
          alert("Verify slip successfully!");
          queryClient.invalidateQueries({ queryKey: ["getAllOrder"] });
        },
        onError: (error) => {
          alert("An error occurred. " + error.message);
        },
      },
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white p-6 rounded shadow-lg w-1/3 max-h-screen overflow-y-auto">
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
    <p>
      <strong>Order Items:</strong>
      {order.orderItems.map((item, index) => {
        const product = products?.find(
          (product) => product.id === item.productId,
        );
        const productSize = product?.productSizes.find(
          (size) => size.id === item.productSizeId,
        );

        if (!product || !productSize) {
          return (
            <li key={index} className="text-sm text-gray-500">
              Product information not found.
            </li>
          );
        }

        return (
          <li key={index} className="text-sm text-gray-700">
            {product.name} ({productSize.name}) - Quantity: {item.quantity}{" "}
            - Price: {productSize.price} THB
          </li>
        );
      })}
    </p>
    <p className="mb-2 mt-5">
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
        order.status === OrderStatus.SUCCESS ||
        session?.data?.user?.role === "MARKETING"
      }
    >
      {Object.values(OrderStatus).map((status) => {
        if (session?.data?.user?.role === "STORE") {
          if (storeAllowedOrderStatus.includes(status))
            return (
              <option key={status} value={status}>
                {getOrderStatusText(status)}
              </option>
            );
        } else {
          return (
            <option key={status} value={status}>
              {getOrderStatusText(status)}
            </option>
          );
        }
      })}
    </select>
    <p className="mb-2">
      <strong>Created At:</strong>{" "}
      {new Date(order.createdAt).toLocaleString()}
    </p>

    {/* Show Payment Slip Image */}
    {order.status === OrderStatus.WAITING_PAYMENT_CONFIRMATION && (
      <div className="text-center mt-3">
        {!isImageLoaded && (
          <span className="text-center loading loading-spinner loading-md"></span>
        )}

        <Image
          alt="Payment Slip"
          src={order.slipImageUrl!}
          width={600}
          height={600}
          onLoad={() => setIsImageLoaded(true)}
          className={`transition-opacity duration-500 rounded-md ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    )}

    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
      >
        Cancel
      </button>
      {order.status === OrderStatus.WAITING_PAYMENT_CONFIRMATION && (
        <>
          <button
            onClick={() => handleVerifySlip(false)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Cancel Billing
          </button>
          <button
            onClick={() => handleVerifySlip(true)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Confirm Billing
          </button>
        </>
      )}

      {order.status !== OrderStatus.WAITING_PAYMENT_CONFIRMATION && (
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Confirm
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default OrderDetailModal;
