"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import CategorySelection from "../components/CategorySelection";
import ProductCard from "../components/ProductCard";
import useProduct from "@/api/user/useProduct";
import { Product } from "@/interfaces/Product";

const ProductsPage = () => {
  const initialCategory = null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );

  const { data: products, isLoading, error } = useProduct();

  const filteredProducts = selectedCategory
    ? products?.filter((product: Product) => product.type === selectedCategory)
    : products;

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 border-b-2 py-2">Products</h1>

      <CategorySelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow animate-pulse flex flex-col"
            >
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default ProductsPage;
