"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Address from "@/interfaces/Address"; // นำเข้า interface สำหรับ Address
import useUserInfo from "@/api/user/useUserInfo";

const MyAddress: React.FC = () => {
  const router = useRouter();

  const { data: userInfo, isLoading, error } = useUserInfo();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 border-b-2 py-2">My Address</h1>

        {userInfo && userInfo.addresses.length > 0 ? (
          <div className="space-y-6">
            {userInfo.addresses.map((address: Address, index: number) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col space-y-2"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {address.houseNumber}, {address.village}, {address.street}
                </p>
                <p className="text-gray-600">
                  {address.alley ? `Alley: ${address.alley}, ` : ""}
                  {address.subDistrict}, {address.district}, {address.province}
                </p>
                <p className="text-gray-600">
                  Postal Code: {address.postalCode}, Country: {address.country}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No addresses found.</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/profile/address/add-address")}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
