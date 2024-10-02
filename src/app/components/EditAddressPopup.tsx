"use client";
import { useState } from "react";

const EditAddressPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  // ฟังก์ชันสำหรับเปิด/ปิด Pop-up
  const togglePopup = () => setIsOpen(!isOpen);

  // ฟังก์ชันสำหรับอัปเดตข้อมูลที่อยู่ใน state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันเมื่อกดปุ่มบันทึก
  const handleSave = () => {
    // คุณสามารถเพิ่มฟังก์ชันในการบันทึกข้อมูลที่อยู่ในฐานข้อมูลหรือส่งข้อมูลไปยัง API
    console.log("Address updated:", address);
    togglePopup(); // ปิด pop-up หลังจากบันทึก
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        className="bg-blue-500 w-full  text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Edit Address
      </button>

      {/* Pop-up แสดงเฉพาะเมื่อเปิดใช้งาน */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Address</h2>

            <div className="mb-4">
              <label className="block mb-1">Street:</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">City:</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">State:</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Country:</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Postal Code:</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={togglePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAddressPopup;
