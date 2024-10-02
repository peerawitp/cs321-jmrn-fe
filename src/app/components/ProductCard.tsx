import React from "react";
import Link from "next/link";
import CartButton from "../components/Cart"; // นำเข้า CartButton

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string; // แก้ไขเป็น imageUrl เพื่อสอดคล้องกับโครงสร้างก่อนหน้า
    quantity: number;
    tireType: string; // เพิ่ม field tireType
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-fit h-48 object-cover ml-auto mr-auto"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">Price: ${product.price.toFixed(2)}</p>
        
        {/* แสดงจำนวนสินค้า */}
        <p className="text-gray-500 mb-2">In Stock: {product.quantity}</p>

        {/* แสดงประเภทของยาง */}
        <p className="text-gray-500 mb-4">Tire Type: {product.tireType}</p>
        
        <CartButton
          productId={product.id}
          productName={product.name}
          price={product.price}
          imageUrl={product.imageUrl} // เปลี่ยนเป็น imageUrl ให้ตรงกับ props
        />
        <Link
          className="flex justify-end mr-1 mt-3 hover:underline"
          href={`/products/${product.id}`}
        >
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
