"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useOrderHistory from "@/api/user/useOrderHistory";
import useProduct from "@/api/user/useProduct";
import { OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";

const OrderHistory: React.FC = () => {
  const router = useRouter();

  const { data: products } = useProduct();
  const { data: orderHistory } = useOrderHistory();
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
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">(
    "ALL",
  );

  const handleCardClick = (orderId: number) => {
    router.push(`/order-history/${orderId}`);
  };

  const filteredOrders =
    selectedStatus === "ALL"
      ? orderHistory
      : orderHistory?.filter((order) => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 py-2 border-b-2">Order History</h1>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            "ALL",
            OrderStatus.WAITING_PAYMENT,
            OrderStatus.WAITING_PAYMENT_CONFIRMATION,
            OrderStatus.PREPARING,
            OrderStatus.SHIPPED,
            OrderStatus.SUCCESS,
            OrderStatus.CANCELLED,
          ].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as OrderStatus)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                selectedStatus === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {status === "ALL"
                ? "All Orders"
                : getOrderStatusText(status as OrderStatus)}
            </button>
          ))}
        </div>

        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-6 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition duration-150"
                onClick={() => handleCardClick(order.id)}
              >
                <h2 className="text-xl font-semibold mb-3 py-2 border-b-2">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Date: {order.createdAt.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Total: {order.totalAmount.toFixed(2)} THB
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Status:{" "}
                  <span className={`font-semibold text-gray-800 ${getStatusColor(order.status)}`}>
                    {getOrderStatusText(order.status)}
                  </span>
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold mb-2">Items:</h3>
                  <ul className="list-disc list-inside">
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
                          {product.name} ({productSize.name}) - Quantity:{" "}
                          {item.quantity} - Price: {productSize.price} THB
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No orders found for the selected status.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
