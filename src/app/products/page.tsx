"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import CategorySelection from "../components/CategorySelection"; // นำเข้า CategorySelection
import ProductCard from "../components/ProductCard"; // นำเข้า ProductCard
import useProduct from "@/api/user/useProduct";
import { Product } from "@/interfaces/Product";

const ProductsPage = () => {
  const searchParams = useSearchParams(); // ใช้สำหรับดึง query params
  const initialCategory = searchParams.get("category"); // ดึงค่าหมวดหมู่จาก URL
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );

  const { data: products, isLoading, error } = useProduct();

  // ฟังก์ชันสำหรับการกรองสินค้าตามหมวดหมู่
  const filteredProducts = selectedCategory
    ? products?.filter((product: Product) => product.type === selectedCategory)
    : products;

  // เมื่อพารามิเตอร์หมวดหมู่เปลี่ยน ให้ตั้งค่า selectedCategory ใหม่
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* ปุ่มเลือกหมวดหมู่ */}
      <CategorySelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* แสดงสินค้าตามหมวดหมู่ที่เลือก */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              {/* ใช้ ProductCard แสดงผลสินค้า */}

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
