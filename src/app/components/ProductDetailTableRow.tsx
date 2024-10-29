"use client";
import React, { useContext, useState } from "react";
import { Product, ProductSize } from "@/interfaces/Product";
import { Context } from "../TableContext";
import { useRouter } from "next/navigation";
import { formatThaiDate } from "@/lib/dateHumanize";

interface TableRowProps {
  productDetail: ProductSize;
  isSelected: boolean;
  onRowClick: (id: number) => void;
}

const ProductDetailTableRow: React.FC<TableRowProps> = ({
  productDetail,
  isSelected,
  onRowClick,
}) => {
  const { setID } = useContext(Context);
  const router = useRouter();

  const setProductID = (id: number) => {
    setID(id);
  };

  const handleRowClick = (id: number) => {
    onRowClick(id);
    setProductID(id);
  };

  return (
    <tr
      className={`h-[100px] border-b last:border-none border-gray-300 cursor-pointer ${
        isSelected ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => handleRowClick(productDetail.id)}
    >
      <td className="break-words border border-gray-300 p-2">
        {productDetail.id}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.productId}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.name}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.overallDiameter}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.overallWidth}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.measurementRim}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.standardRim}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.price}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {productDetail.quantity}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {formatThaiDate(productDetail.updatedAt)}
      </td>
    </tr>
  );
};

export default ProductDetailTableRow;
