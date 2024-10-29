"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useProduct from "@/api/user/useProduct";
import { ProductSize } from "@/interfaces/Product";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/stores/useCartStore";

export default function ProductPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { productId } = useParams();
  const { data: products, isLoading } = useProduct();
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const { cartItems, addToCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded-lg shadow-lg max-w-5xl animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Image Skeleton */}
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>

          {/* Right Section: Product Details Skeleton */}
          <div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>

            {/* Size Selection Skeleton */}
            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>

            {/* Selected Size Information Skeleton */}
            <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Quantity Adjuster and Add to Cart Button Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-10 bg-gray-300 rounded w-16"></div>
              <div className="h-10 bg-gray-300 rounded w-16"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>

        {/* Description Section Skeleton */}
        <div className="bg-gray-100 mt-8 p-4 rounded-lg">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }


  const product = products?.find((p) => p.id === Number(productId));

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTireSize = product?.productSizes.find(
      (size: ProductSize) => size.name === e.target.value
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
      alert("Unable to add due to insufficient remaining quantity.");
    }
  };

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    } else if (quantity > selectedSize.quantity) {
      alert("Unable to add due to insufficient remaining quantity.");
      return;
    }

    const cartItem = {
      productId: product?.id || 0,
      productSizeId: selectedSize.id,
      quantity: quantity,
      price: selectedSize.price,
      totalPrice: quantity * selectedSize.price,
    };

    addToCart(cartItem);
  };

  return (
    product && (
      <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded-lg shadow-lg max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-xl">
          {/* Left Section: Product Image */}
          <div className="flex flex-col items-start">
            <img
              className="w-full h-64 object-contain rounded-lg shadow-md md:h-full border-2 border-gray-300"
              src={product.imageUrl || "/images/no_image.jpg"}
              alt={product.name}
            />
          </div>

          {/* Right Section: Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-center md:text-left border-b-2 border-gray-300 pb-2">
              {product.name}
            </h1>

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
                      {size.name} - {size.price} THB
                    </option>
                  ))}
              </select>
            </div>

            {/* Selected Size Information */}
            {selectedSize && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-2">
                  Selected Size:
                </h3>
                <p>Overall Diameter: {selectedSize.overallDiameter} mm</p>
                <p>Overall Width: {selectedSize.overallWidth} mm</p>
                <p>Measurement Rim: {selectedSize.measurementRim} inches</p>
                <p>Standard Rim: {selectedSize.standardRim} inches</p>
                <p className="font-medium">Price: {selectedSize.price} THB</p>
              </div>
            )}

            {/* Quantity Adjuster and Add to Cart Button */}
            {selectedSize && (
              <div className="mt-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-4">
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
                </div>
                <p className="font-medium">Remaining: {selectedSize.quantity}</p>
                {session?.user?.email ? (
                  session.user.role === "CUSTOMER" ? (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center md:w-auto"
                    >
                      Add to Cart
                    </button>
                  ) : null
                ) : (
                  <Link
                    href="/auth"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center md:w-auto"
                  >
                    Login to Add to Cart
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description Section at the Bottom */}
        <div className="bg-gray-100 mt-8 p-4 rounded-lg">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2">
            Description
          </h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
        </div>
      </div>
    )
  );
}
