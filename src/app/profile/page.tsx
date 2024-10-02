"use client";
import React from "react";
import Image from "next/image";
import { orderStatus } from "@/data/orderStatus"; // นำเข้าข้อมูลจากไฟล์ products.ts
import EditAddressPopup from "../components/EditAddressPopup";
import useUserInfo from "@/api/user/useUserInfo";
import Address from "@/interfaces/Address";

const Profile = () => {
  const { data: userInfo, isLoading, error } = useUserInfo();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user info</div>;
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {/* ข้อมูลผู้ใช้ */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <p>
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p>Email: {userInfo?.email}</p>
          <p>Phone: {userInfo?.phone}</p>

          {userInfo?.addresses &&
            userInfo?.addresses.map((address: Address, index: number) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    Address: {address.houseNumber} {address.village},{" "}
                    {address.alley} {address.street} {address.subDistrict},{" "}
                    {address.district}, {address.province}, {address.postalCode}
                    , {address.country}
                  </p>
                  <p>Country: {address.country}</p>
                  <p>Postal Code: {address.postalCode}</p>
                </div>
                {/* <EditAddressPopup address={address} /> */}
              </div>
            ))}

          {/* <div className="bg-gray-50 p-3 rounded">
            <p>Address: 1234 Main St, Springfield, </p>
            <p>Country: United States</p>
            <p>Postal Code: 62701</p>
            <EditAddressPopup />
          </div> */}
        </div>

        {/* ประวัติคำสั่งซื้อ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Orders History</h2>
          {orderStatus.length > 0 ? (
            <div className="space-y-4">
              {orderStatus.map((orders) => (
                <div
                  key={orders.orderId}
                  className="p-4 bg-gray-50 rounded shadow"
                >
                  <h3 className="text-lg font-bold mb-2">
                    Orders #{orders.orderId}
                  </h3>
                  <p>Date: {orders.date}</p>
                  <p>
                    Status:{" "}
                    <span className="font-semibold">{orders.status}</span>
                  </p>
                  <p>Total: ${orders.total.toFixed(2)}</p>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Items</h4>
                    <ul className="list-disc list-inside">
                      {orders.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          {/* แสดงรูปภาพสินค้า */}
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <span>
                            {item.productName} - Quantity: {item.quantity} -
                            Price: ${item.price.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
