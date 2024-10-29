import { Product } from "@/interfaces/Product";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg border-2 border-gray-200">
      <img
        src={product.imageUrl || "/images/default.jpg"}
        alt={product.name}
        className="w-fit h-48 object-cover ml-auto mr-auto"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">Type: {product.type}</p>
      </div>
    </div>
  );
};

export default ProductCard;
