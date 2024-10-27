"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserInfo from "@/api/user/useUserInfo";
import { useCartStore } from "@/stores/useCartStore";
import useProduct from "@/api/user/useProduct";

import useConfirmPurchase from "@/api/user/useConfirmPurchase";

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCartStore();
  const { data: products } = useProduct();

  const confirmPurchaseMutation = useConfirmPurchase();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null); // เก็บข้อมูลที่อยู่ที่เลือก
  const router = useRouter();
  const { data: userInfo, isLoading, error } = useUserInfo();
  // ฟังก์ชันคำนวณราคารวม
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products?.find((p) => p.id === item.productId);
      const sizeInfo = product?.productSizes.find(
        (size) => size.id === item.productSizeId,
      );

      return sizeInfo ? total + sizeInfo.price * item.quantity : total;
    }, 0);
  };

  // ฟังก์ชันจัดการการเลือกที่อยู่
  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddressIndex(Number(e.target.value));
  };

  const handleConfirmPurchase = async () => {
    if (selectedAddressIndex === null) {
      alert("Please select an address.");
      return;
    }

    const data = {
      addressId: userInfo?.addresses[selectedAddressIndex].id || 0,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        productSizeId: item.productSizeId,
        quantity: item.quantity,
      })),
    };

    await confirmPurchaseMutation.mutateAsync(data, {
      onSuccess: () => {
        // Remove items from cart
        clearCart();

        alert("Order created successfully!");
        router.push("/order-history");
      },
      onError: (error) => {
        alert("An error occurred. " + error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* ถ้าตะกร้าว่าง */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">No items in your cart.</p>
        ) : (
          <>
            {/* แสดงที่อยู่สำหรับการจัดส่ง */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">
                Select Shipping Address:
              </h2>
              <select
                onChange={handleAddressChange}
                value={
                  selectedAddressIndex !== null ? selectedAddressIndex : ""
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an address</option>
                {/* ดึงที่อยู่จาก userInfo */}
                {userInfo && userInfo.addresses.length > 0 ? (
                  userInfo.addresses.map((address: any, index: number) => (
                    <option key={index} value={index}>
                      {address.houseNumber}, {address.village}, {address.street}
                      , {address.subDistrict}, {address.district},{" "}
                      {address.province}, {address.postalCode}
                    </option>
                  ))
                ) : (
                  <option disabled>No addresses found.</option>
                )}
              </select>

              {/* แสดงรายละเอียดที่อยู่ที่เลือก */}
              {selectedAddressIndex !== null &&
                userInfo?.addresses[selectedAddressIndex] && (
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <p>
                      <strong>Address:</strong>
                    </p>
                    <p>
                      {userInfo.addresses[selectedAddressIndex].houseNumber}{" "}
                      {userInfo.addresses[selectedAddressIndex].village}
                    </p>
                    {userInfo.addresses[selectedAddressIndex].alley && (
                      <p>
                        Alley: {userInfo.addresses[selectedAddressIndex].alley}
                      </p>
                    )}
                    <p>
                      Street: {userInfo.addresses[selectedAddressIndex].street}
                    </p>
                    <p>
                      Sub District:{" "}
                      {userInfo.addresses[selectedAddressIndex].subDistrict},
                      District:{" "}
                      {userInfo.addresses[selectedAddressIndex].district},
                      Province:{" "}
                      {userInfo.addresses[selectedAddressIndex].province}
                    </p>
                    <p>
                      Postal Code:{" "}
                      {userInfo.addresses[selectedAddressIndex].postalCode}
                    </p>
                    <p>
                      Country:{" "}
                      {userInfo.addresses[selectedAddressIndex].country}
                    </p>
                  </div>
                )}
            </div>

            {/* แสดงรายการสินค้า */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = products?.find((p) => p.id === item.productId); // ค้นหาสินค้า
                if (!product) return null; // ถ้าไม่เจอสินค้าก็ไม่แสดง
                const productSize = product.productSizes.find(
                  (size) => size.id === item.productSizeId,
                ); // ขนาดสินค้า

                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
                  >
                    <div className="flex items-center space-x-4">
                      {/* แสดงรูปภาพสินค้า */}
                      <img
                        src={product.imageUrl || "/images/no_image.jpg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">
                          Tire Size: {productSize?.name}
                        </p>
                        <p className="text-gray-600">
                          Price: {productSize?.price.toFixed(2)} THB
                        </p>
                      </div>
                    </div>

                    {/* แสดงจำนวนสินค้า */}
                    <div className="text-gray-700">
                      Quantity: {item.quantity}
                    </div>

                    {/* ราคารวมต่อสินค้า */}
                    <div className="text-gray-700 font-semibold">
                      Total: {(productSize?.price! * item.quantity).toFixed(2)}{" "}
                      THB
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ราคารวมทั้งหมด */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Total: {calculateTotalPrice().toFixed(2)} THB
              </p>
              <button
                className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleConfirmPurchase}
              >
                Confirm Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
