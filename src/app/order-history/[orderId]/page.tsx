"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useOrderHistory from "@/api/user/useOrderHistory";
import useProduct from "@/api/user/useProduct";
import useUserInfo from "@/api/user/useUserInfo";

import { Order, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";

import useConfirmReceive from "@/api/user/useConfirmReceive";
import { useQueryClient } from "@tanstack/react-query";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const { data: orderHistory, isLoading, error } = useOrderHistory();
  const { data: products } = useProduct();
  const { data: userInfo } = useUserInfo();

  const [order, setOrder] = useState<Order | null>(null);

  const confirmReceiveMutation = useConfirmReceive();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (orderHistory && userInfo) {
      const foundOrder = orderHistory.find(
        (order) => order.id === Number(orderId),
      );
      setOrder(foundOrder || null);
    }
  }, [orderHistory, orderId, userInfo]);

  if (isLoading) {
    return <div className="min-h-screen p-8 text-center">Loading...</div>;
  }

  if (error || !order) {
    return <div className="min-h-screen p-8 text-center">Order not found.</div>;
  }

  const shippingAddress = userInfo?.addresses.find(
    (address) => address.id === order.addressId,
  );

  const confirmDelivery = async () => {
    await confirmReceiveMutation.mutateAsync(
      { orderId: order.id },
      {
        onSuccess: () => {
          alert("Order status updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
        },
        onError: (error) => {
          alert("An error occurred. " + error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Order #{order.id}
        </h1>
        <p className="text-lg text-center mb-6">
          Here are the details of your order.
        </p>

        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p className="text-gray-700">
            Order Date: {order.createdAt.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-4">
            Total: {order.totalAmount.toFixed(2)} บาท
          </p>
          <p className="text-gray-700 mb-4">
            Status:{" "}
            <span className="font-semibold">
              {getOrderStatusText(order.status)}
            </span>
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Items in your order:</h3>
            <ul className="space-y-4">
              {order.orderItems.map((item, index) => {
                const product = products?.find((p) => p.id === item.productId);
                const productSize = product?.productSizes.find(
                  (size) => size.id === item.productSizeId,
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
                      {(productSize?.price! * item.quantity).toFixed(2)} บาท
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p>
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p>
            {shippingAddress?.houseNumber} {shippingAddress?.village}{" "}
            {shippingAddress?.alley ? `Alley ${shippingAddress?.alley}` : ""}{" "}
          </p>
          <p>
            {shippingAddress?.subDistrict} {shippingAddress?.district}{" "}
            {shippingAddress?.postalCode}
          </p>
          <p>{shippingAddress?.country}</p>
        </div>
              
        {order.status === OrderStatus.SHIPPED && (
          <div className="text-center mt-4">
            <button
              onClick={confirmDelivery}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm Delivery
            </button>
          </div>
        )}
        {order.status === OrderStatus.WAITING_PAYMENT && (
          <div className="text-center mt-4">
            <button
              onClick={confirmDelivery}
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel Order
            </button>
          </div>
        )}
        

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
