"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { findProductById } from "@/data/products";
import CartItemUpdater from "../components/CartItemUpdater"; // นำเข้าคอมโพเนนต์ที่สร้างใหม่
import Image from "next/image"; // นำเข้า Image component
import { useCartStore } from "@/stores/useCartStore";
import useProduct from "@/api/user/useProduct";

const Cart: React.FC = () => {
  const router = useRouter();

  const {
    cartItems,
    increaseQuantity: storeIncreaseQuantity,
    decreaseQuantity: storeDecreaseQuantity,
  } = useCartStore();

  const { data: products, isLoading } = useProduct();

  // ฟังก์ชันสำหรับคำนวณราคารวมทั้งหมด
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products?.find((p) => p.id === item.productId);
      const sizeInfo = product?.productSizes.find(
        (size) => size.id === item.productSizeId,
      ); // ค้นหาขนาดสินค้า
      return sizeInfo ? total + sizeInfo.price * item.quantity : total; // คำนวณราคาตามจำนวนสินค้า
    }, 0);
  };

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้าในตะกร้า
  const increaseQuantity = (productId: number, productSizeId: number) => {
    // TODO: Check if the quantity is less than the available stock
    storeIncreaseQuantity(productId, productSizeId);
  };

  // ฟังก์ชันสำหรับลดจำนวนสินค้าในตะกร้า
  const decreaseQuantity = (productId: number, productSizeId: number) => {
    storeDecreaseQuantity(productId, productSizeId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {/* ถ้าตะกร้าว่าง */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* แสดงรายการสินค้าในตะกร้า */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = products?.find((p) => p.id === item.productId); // ค้นหาสินค้า
                if (!product) return null; // ถ้าไม่เจอสินค้าก็ข้ามไป
                const productSize = product.productSizes.find(
                  (size) => size.id === item.productSizeId,
                ); // ขนาดสินค้า

                return (
                  <div
                    key={`${item.productId}-${productSize?.name}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
                  >
                    {/* แสดงรูปภาพสินค้า */}
                    <div className="flex items-center space-x-4">
                      <Image
                        src={product.imageUrl || "/images/no_image.jpg"} // ใช้รูปภาพของสินค้าจากข้อมูลสินค้า
                        alt={product.name}
                        width={100} // กำหนดขนาดความกว้างของรูปภาพ
                        height={100} // กำหนดขนาดความสูงของรูปภาพ
                        className="rounded"
                      />
                      <div>
                        {/* แสดงชื่อสินค้าและขนาด */}
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">
                          Size: {productSize?.name}
                        </p>
                      </div>
                    </div>

                    {/* ใช้งานคอมโพเนนต์ CartItemUpdater */}
                    <CartItemUpdater
                      productId={item.productId}
                      productSizeId={item.productSizeId}
                      quantity={item.quantity}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />

                    {/* แสดงราคาสินค้าตามขนาด */}
                    <div className="text-right">
                      {productSize && (
                        <p className="text-gray-600">
                          Price: {productSize.price.toFixed(2)} บาท
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ราคารวมทั้งหมด */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Total: {calculateTotalPrice().toFixed(2)} บาท
              </p>
              <button
                onClick={() => router.push("/checkout")}
                className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
