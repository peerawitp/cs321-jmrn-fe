"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Address from "@/interfaces/Address"; // นำเข้า interface สำหรับ Address
import useUserInfo from "@/api/user/useUserInfo";

const MyAddress: React.FC = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, error } = useUserInfo();

  // State to manage the modal visibility and the selected address
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteAddress = (addressId: string) => {
    console.log(`Deleting address with ID: ${addressId}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  const handleSaveChanges = (updatedAddress: Address) => {
    // Implement your API call here to save the updated address
    console.log("Updated Address:", updatedAddress);
    handleCloseModal(); // Close the modal after saving changes
  };

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

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)} // Ensure address.id is available
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
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

      {/* Modal for editing address */}
      {isModalOpen && selectedAddress && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Address</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedAddress: Address = {
                  ...selectedAddress,
                  houseNumber: formData.get("houseNumber")?.toString() || selectedAddress.houseNumber,
                  village: formData.get("village")?.toString() || selectedAddress.village,
                  street: formData.get("street")?.toString() || selectedAddress.street,
                  alley: formData.get("alley")?.toString() || selectedAddress.alley,
                  subDistrict: formData.get("subDistrict")?.toString() || selectedAddress.subDistrict,
                  district: formData.get("district")?.toString() || selectedAddress.district,
                  province: formData.get("province")?.toString() || selectedAddress.province,
                  postalCode: formData.get("postalCode")?.toString() || selectedAddress.postalCode,
                  country: formData.get("country")?.toString() || selectedAddress.country,
                };
                handleSaveChanges(updatedAddress);
              }}
            >
              <p className="font-bold">House Number:</p>
              <input
                type="text"
                name="houseNumber"
                defaultValue={selectedAddress.houseNumber}
                placeholder="House Number"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Village:</p>
              <input
                type="text"
                name="village"
                defaultValue={selectedAddress.village}
                placeholder="Village"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Street:</p>
              <input
                type="text"
                name="street"
                defaultValue={selectedAddress.street}
                placeholder="Street"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Alley:</p>
              <input
                type="text"
                name="alley"
                defaultValue={selectedAddress.alley}
                placeholder="Alley"
                className="border p-2 rounded w-full mb-2"
              />
              <p className="font-bold">Sub District:</p>
              <input
                type="text"
                name="subDistrict"
                defaultValue={selectedAddress.subDistrict}
                placeholder="Sub-District"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">District:</p>
              <input
                type="text"
                name="district"
                defaultValue={selectedAddress.district}
                placeholder="District"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Province:</p>
              <input
                type="text"
                name="province"
                defaultValue={selectedAddress.province}
                placeholder="Province"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Postal Code:</p>
              <input
                type="text"
                name="postalCode"
                defaultValue={selectedAddress.postalCode}
                placeholder="Postal Code"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <p className="font-bold">Country:</p>
              <input
                type="text"
                name="country"
                defaultValue={selectedAddress.country}
                placeholder="Country"
                className="border p-2 rounded w-full mb-4"
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddress;
