"use client";
import React from "react";

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
          key={category.value || null}
          onClick={() => setSelectedCategory(category.value)}
          className={`px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 ${
            selectedCategory === category.value
              ? `ring-2 ring-blue ring-offset-2 bg-blue-600`
              : "bg-blue-500"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySelection;
