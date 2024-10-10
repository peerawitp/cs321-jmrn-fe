"use client";
import React from "react";
import useUserInfo from "@/api/user/useUserInfo";
import Address from "@/interfaces/Address";
import { useRouter } from "next/navigation"; // ใช้ router เพื่อเปลี่ยนหน้า

const Profile = () => {
  const { data: userInfo, isLoading, error } = useUserInfo();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mt-8"></div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-2/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>

            <div className="h-6 bg-gray-300 rounded w-1/3 mt-8"></div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error loading user info</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {/* ข้อมูลผู้ใช้ */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <p>{userInfo?.firstName} {userInfo?.lastName}</p>
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
                    Address: {address.houseNumber} {address.village}, {address.alley} {address.street} {address.subDistrict}, {address.district}, {address.province}, {address.postalCode}, {address.country}
                  </p>
                  <p>Country: {address.country}</p>
                  <p>Postal Code: {address.postalCode}</p>
                </div>
              </div>
            ))}
        </div>

        {/* ปุ่มจัดวางในแนวนอน */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('profile/address')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            My Address
          </button>
          
          <button
            onClick={() => router.push('/order-history')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
