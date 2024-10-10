"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ใช้เพื่อเปลี่ยนหน้า

const AddAddress: React.FC = () => {
    const [newAddress, setNewAddress] = useState({
        houseNumber: "",
        village: "",
        alley: "",
        street: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
        country: "",
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // คุณสามารถเรียก API ที่เกี่ยวข้องเพื่อเพิ่มที่อยู่ในระบบที่นี่
        console.log(newAddress);
        alert("Address added successfully!");
        router.push("/profile/address"); // เปลี่ยนหน้าไปที่หน้า My Address หลังจากเพิ่มที่อยู่เสร็จ
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Add New Address</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Use grid layout to organize the form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="houseNumber" className="block text-gray-700 font-bold mb-2">
                                House Number:
                            </label>
                            <input
                                type="text"
                                id="houseNumber"
                                name="houseNumber"
                                placeholder="House Number"
                                value={newAddress.houseNumber}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="village" className="block text-gray-700 font-bold mb-2">
                                Village:
                            </label>
                            <input
                                type="text"
                                id="village"
                                name="village"
                                placeholder="Village"
                                value={newAddress.village}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="alley" className="block text-gray-700 font-bold mb-2">
                                Alley:
                            </label>
                            <input
                                type="text"
                                id="alley"
                                name="alley"
                                placeholder="Alley"
                                value={newAddress.alley}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-gray-700 font-bold mb-2">
                                Street:
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Street"
                                value={newAddress.street}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="subDistrict" className="block text-gray-700 font-bold mb-2">
                                Sub-District:
                            </label>
                            <input
                                type="text"
                                id="subDistrict"
                                name="subDistrict"
                                placeholder="Sub-District"
                                value={newAddress.subDistrict}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-gray-700 font-bold mb-2">
                                District:
                            </label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder="District"
                                value={newAddress.district}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="province" className="block text-gray-700 font-bold mb-2">
                                Province:
                            </label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                placeholder="Province"
                                value={newAddress.province}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-gray-700 font-bold mb-2">
                                Postal Code:
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={newAddress.postalCode}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
                                Country:
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Country"
                                value={newAddress.country}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAddress;
