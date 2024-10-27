"use client";
import { useRouter } from "next/navigation";
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
    removeItem: storeRemoveItem,
  } = useCartStore();

  const { data: products, isLoading } = useProduct();

  // ฟังก์ชันสำหรับคำนวณราคารวมทั้งหมด
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products?.find((p) => p.id === item.productId);
      const sizeInfo = product?.productSizes.find(
        (size) => size.id === item.productSizeId
      );
      return sizeInfo ? total + sizeInfo.price * item.quantity : total;
    }, 0);
  };

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้าในตะกร้า
  const increaseQuantity = (productId: number, productSizeId: number) => {
    // ตรวจสอบว่ามีสินค้าจำนวนมากพอหรือไม่
    const product = products?.find((p) => p.id === productId);
    const productSize = product?.productSizes.find(
      (size) => size.id === productSizeId
    );

    const cartItem = cartItems.find(
      (item) => item.productId === productId && item.productSizeId === productSizeId
    );

    if (productSize && cartItem && cartItem.quantity < productSize.quantity) {
      storeIncreaseQuantity(productId, productSizeId);
    } else {
      alert("Unable to add due to insufficient remaining quantity.");
    }
  };

  // ฟังก์ชันสำหรับลดจำนวนสินค้าในตะกร้า
  const decreaseQuantity = (productId: number, productSizeId: number) => {
    storeDecreaseQuantity(productId, productSizeId);
  };

  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  const removeItem = (productId: number, productSizeId: number) => {
    storeRemoveItem(productId, productSizeId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 border-b-2 py-2">Shopping Cart</h1>

        {/* ถ้าตะกร้าว่าง */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* แสดงรายการสินค้าในตะกร้า */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = products?.find((p) => p.id === item.productId);
                if (!product) return null;

                const productSize = product.productSizes.find(
                  (size) => size.id === item.productSizeId
                );

                // ตรวจสอบว่าจำนวนสินค้าในตะกร้ามากกว่าจำนวนคงเหลือหรือไม่
                const maxQuantity = productSize ? productSize.quantity : 0;
                const cartQuantity = item.quantity > maxQuantity ? maxQuantity : item.quantity;

                // หากจำนวนสินค้าในตะกร้ามากกว่าจำนวนคงเหลือ ให้ปรับจำนวน
                if (item.quantity > maxQuantity) {
                  storeDecreaseQuantity(item.productId, item.productSizeId);
                }

                return (
                  <div
                    key={`${item.productId}-${productSize?.name}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={product.imageUrl || "/images/no_image.jpg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">Size: {productSize?.name}</p>
                      </div>
                    </div>

                    <CartItemUpdater
                      productId={item.productId}
                      productSizeId={item.productSizeId}
                      quantity={cartQuantity} // ใช้ค่า cartQuantity แทน item.quantity
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      removeItem={removeItem}
                    />

                    <p>Remaining: {productSize?.quantity} </p>

                    <div className="text-right">
                      {productSize && (
                        <p className="text-gray-600">
                          Price: {productSize.price.toFixed(2)} THB
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
                Total: {calculateTotalPrice().toFixed(2)} THB
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
