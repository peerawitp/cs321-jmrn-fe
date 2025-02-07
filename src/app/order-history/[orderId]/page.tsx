"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useOrderHistory from "@/api/user/useOrderHistory";
import useProduct from "@/api/user/useProduct";
import useUserInfo from "@/api/user/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Order, OrderStatus } from "@/interfaces/Order";
import { getOrderStatusText } from "@/lib/orderStatusText";

import useConfirmReceive from "@/api/user/useConfirmReceive";
import { useQueryClient } from "@tanstack/react-query";
import useCancelOrder from "@/api/user/useCancelOrder";
import useUploadSlip from "@/api/user/useUploadSlip";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  console.log(orderId)
  const router = useRouter();
  const { data: orderHistory, isLoading, error } = useOrderHistory();
  const { data: products } = useProduct();
  const { data: userInfo } = useUserInfo();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isUploading, setIsUploading] = useState(false); // State to track upload status

  const confirmReceiveMutation = useConfirmReceive();
  const cancelOrderMutation = useCancelOrder();
  const queryClient = useQueryClient();
  const uploadSlipMutation = useUploadSlip();

  useEffect(() => {
    if (orderHistory && userInfo) {
      const foundOrder = orderHistory.find(
        (order) => order.id === Number(orderId),
      );
      setOrder(foundOrder || null);
    }
  }, [orderHistory, orderId, userInfo]);

  const handleFileChange = async () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      setIsUploading(true); // Set uploading state to true
      await uploadSlipMutation.mutateAsync(
        { orderId: order?.id!, slip: file },
        {
          onSuccess: () => {
            alert("Slip uploaded successfully!");
            queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
          },
          onError: (error) => {
            alert("An error occurred. " + error.message);
          },
        },
      );

      setIsUploading(false); // Set uploading state to false
    }
  };

  if (isLoading || !order) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-lg ">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="bg-gray-100 p-6 rounded mb-6 shadow-md">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
            </div>
            <div className="bg-gray-100 p-6 rounded mb-6 shadow-md">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-gray-300 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const cancelOrder = async () => {
    await cancelOrderMutation.mutateAsync(
      { orderId: order.id },
      {
        onSuccess: () => {
          alert("Order has been cancelled!");
          queryClient.invalidateQueries({ queryKey: ["products"] });
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
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center py-2 border-b-2">
          Order #{order.id}
        </h1>
        {/* Loading Animation */}
        {isUploading && (
          <div className="text-center mt-4">
            <p>Uploading slip...</p>
            <div className="loader"></div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <p className="text-lg text-center mb-6">
          Here are the details of your order.
        </p>

        {order.status === OrderStatus.WAITING_PAYMENT && (
          <div className="text-center mt-4">
            <button
              onClick={handleButtonClick}
              className="rounded-md px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white mb-4"
            >
              <FontAwesomeIcon icon={faUpload} className="px-1" />
              Upload Payment Slip
            </button>
          </div>
        )}
        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h3 className="text-xl font-bold  mb-2 py-2 border-b-2">Shipping Information</h3>
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

        <div className="bg-gray-50 p-6 rounded mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 py-2 border-b-2">Order Details</h2>
          <p className="text-gray-700 ">
            Order Date: {order.createdAt.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-4">
            Total: {order.totalAmount.toFixed(2)} THB
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
                        <p>{productSize?.name}</p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">
                      {(productSize?.price! * item.quantity).toFixed(2)} THB
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>



        <div className="flex justify-end space-x-4 mt-4">
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
                onClick={cancelOrder}
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => router.push("/order-history")}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Back to Order History
            </button>
          </div>
        </div>
      </div>
      {/* CSS for loader */}
      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3; /* Light grey */
          border-top: 6px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetail;
