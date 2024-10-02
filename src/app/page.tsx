"use client";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";

export default function Home() {
  const router = useRouter();

  // ฟังก์ชันที่ใช้สำหรับการนำทางไปยังหน้า category ที่เลือก
  const handleCategoryClick = (category: string | null) => {
    if(category != null) {
      router.push(`/products?category=${category}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="bg-white rounded shadow-lg container mx-auto mt-8 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Our Motorcycle Tire Shop!</h1>
      <p className="text-lg mb-3 text-center">
        We provide high-quality motorcycle tires for every rider's needs. Explore our wide range of tires from 
        Scooter to Off-Road options, designed for both performance and durability.
      </p>
      <p className="text-lg mb-6 text-center">Select a category below to get started!</p>
      <h2 className="text-3xl font-bold mb-6">Categories of Tires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {categories.map((category) => (
          <button
            key={category.value || "all"}
            onClick={() => handleCategoryClick(category.value)}
            className={`bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
