"use client";

import React from 'react';
import { useParams } from 'next/navigation';  // ใช้ useParams แทน
import { useEffect, useState } from 'react';
import { products } from '@/data/products';  // นำเข้าข้อมูลจากไฟล์ products.ts

export default function ProductPage() {
  const { productId } = useParams();  // ดึง productId จาก URL
  const [product, setProduct] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    tirePattern: '',
  });

  // ตั้งค่าเริ่มต้นของสินค้าเมื่อมีการเปลี่ยนแปลง productId
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === Number(productId));
      setProduct(foundProduct);
    }
  }, [productId]);

  // ฟังก์ชันสำหรับเปลี่ยนแปลงตัวเลือกที่ผู้ใช้เลือก
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  // กรณีไม่พบสินค้าหรือข้อมูลยังไม่ถูกโหลด
  if (!product) {
    return <p>Product not found or loading...</p>;
  }

  return (
    <div className='container mx-auto mt-8 px-4 py-8 bg-white rounded shadow-lg'>
      <img className="w-fit h-48 object-cover ml-auto mr-auto" src={product.imageUrl} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {/* Custom Dropdowns */}
      <div className="mt-4">
        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">Select Size:</label>
        <select
          name="size"
          id="size"
          value={selectedOptions.size}
          onChange={handleOptionChange}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Choose Size</option>
          {product.customOption?.find(option => option.label === 'Size')?.options.map((sizeOption) => (
            <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
          ))}
        </select>
      </div>

      {/* แสดงตัวเลือกที่ผู้ใช้เลือก */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Selected Custom Options:</h2>
        <p>Size: {selectedOptions.size || 'Not selected'}</p>
      </div>

      {/* ปุ่ม Add to Cart */}
      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
        Add to Cart
      </button>
    </div>
  );
}
