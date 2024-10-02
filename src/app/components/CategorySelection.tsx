"use client";
import React from "react";
import { categories } from "@/data/categories"; // นำเข้าข้อมูล categories

interface CategorySelectionProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex space-x-4 mb-6 text-white">
      {categories.map((category) => (
        <button
          key={category.value || "all"}
          onClick={() => setSelectedCategory(category.value)}
          className={`px-4 py-2 rounded-md bg-gray-500 ${
            selectedCategory === category.value
              ? `ring-2 ring-black ring-offset-2 bg-gray-700`
              : "bg-gray-500"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySelection;
