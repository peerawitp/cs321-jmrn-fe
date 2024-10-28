"use client";
import React, { useContext } from "react";
import { Product, ProductSize } from "@/interfaces/Product";
import { Context } from "../TableContext";
import { useRouter } from "next/navigation";

interface TableRowProps {
  productDetail: ProductSize[];
  isSelected: boolean;
  onRowClick: (id: number) => void; // Function to handle row click
}

const ProductDetailTableRow: React.FC<TableRowProps> = ({
  productDetail,
  isSelected,
  onRowClick,
}) => {
  const { setID } = useContext(Context);
  const setProductID = (id: number) => {
    setID(id);
    // console.log("Set id from Tablerow.tsx: " + id)
  };

  const handleClick = () => {
    onRowClick(productDetail.id);
    setproductDetailID(productDetail.id);
    // console.log("id " + productDetail.id + " is set in handleClick() in Tablerow.tsx")
  };

  const router = useRouter();

  if (!productDetail) return null; 

  return (
    <>
      {productDetail.map((product) => (
        <tr
          key={product.id}
          className={`h-[100px] border-b last:border-none border-gray-300 cursor-pointer ${
            isSelected ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => handleRowClick(product.id)}
        >
          <td className="break-words border border-gray-300 p-2">{product.id}</td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.productId}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.name}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.overallDiameter}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.overallWidth}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.measurementRim}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.standardRim}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.price}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.quantity}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.createdAt}
          </td>
          <td className="break-words border-r border-gray-300 p-2">
            {product.updatedAt}
          </td>
          <td className="border gap-2 px-2 h-[100px] flex flex-row relative items-center justify-center text-center">
            <button
              className="btn text-white bg-blue-500 px-2 py-1 text-sm mx-3"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`stock-management/${product.id}`);
              }}
            >
              View detail
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductDetailTableRow;
