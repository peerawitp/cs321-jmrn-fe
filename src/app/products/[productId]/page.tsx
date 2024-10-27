"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useProduct from "@/api/user/useProduct";
import { ProductSize } from "@/interfaces/Product";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/stores/useCartStore";

export default function ProductPage() {
  const [isMounted, setIsMounted] = useState(false); // New state for checking client-side rendering
  const { productId } = useParams();
  const { data: products, isLoading, error } = useProduct();
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();

  const { cartItems, addToCart } = useCartStore();

  console.log("cartItems:", cartItems);

  // Ensure it's rendered on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering on server
  }

  if (isLoading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  const product = products?.find((p) => p.id === Number(productId));

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTireSize = product?.productSizes.find(
      (size: ProductSize) => size.name === e.target.value,
    );
    if (quantity > selectedTireSize?.quantity!) {
      setQuantity(selectedTireSize?.quantity || 1);
    }
    setSelectedSize(selectedTireSize);
  };

  const increaseQuantity = () => {
    if (selectedSize && quantity < selectedSize.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      alert("ไม่สามารถเพิ่มได้ เนื่องจากจำนวนคงเหลือไม่เพียงพอ");
    }
  };

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      productId: product?.id || 0,
      productSizeId: selectedSize.id,
      quantity: quantity,
      price: selectedSize.price,
      totalPrice: quantity * selectedSize.price,
    };

    console.log("Added to cart:", JSON.stringify(cartItem, null, 2));
    addToCart(cartItem);
  };

  return (
    product && (
      <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded-lg shadow-lg max-w-3xl">
        <img
          className="w-full h-64 object-contain"
          src={product.imageUrl || "/images/no_image.jpg"}
          alt={product.name}
        />
        <h1 className="text-3xl font-bold mt-4 text-center">{product.name}</h1>

        <div className="bg-gray-100 mt-6 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            Select Size:
          </label>
          <select
            name="size"
            id="size"
            onChange={handleSizeChange}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose Size</option>
            {product.productSizes
              .filter((size: ProductSize) => size.quantity > 0)
              .map((size: ProductSize) => (
                <option key={size.id} value={size.name}>
                  {size.name} - {size.price} บาท
                </option>
              ))}
          </select>
        </div>

        {selectedSize && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Selected Size:</h3>
            <p className="font-medium">Price: {selectedSize.price} บาท</p>
            <p>Overall Diameter: {selectedSize.overallDiameter} mm</p>
            <p>Overall Width: {selectedSize.overallWidth} mm</p>
            <p>Measurement Rim: {selectedSize.measurementRim} inches</p>
            <p>Standard Rim: {selectedSize.standardRim} inches</p>
          </div>

        )}
        {selectedSize && (
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              +
            </button>
            <p className="font-medium">จำนวนคงเหลือ: {selectedSize.quantity}</p>

          </div>
        )
        }

        <div className="mt-6 flex justify-center items-center space-x-4">
          {session?.user?.email ? (
            session.user.role === "CUSTOMER" ? (
              <button
                onClick={handleAddToCart}
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex justify-center items-center text-center"
              >
                Add to Cart
              </button>
            ) : null // Hides button for MARKETING and STORE roles
          ) : (
            <Link
              href="/auth"
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex justify-center items-center text-center"
            >
              Login to Add to Cart
            </Link>
          )}

        </div>
      </div>
    )
  );
}
