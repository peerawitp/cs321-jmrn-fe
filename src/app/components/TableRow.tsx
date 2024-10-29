"use client";
import React, { useContext } from "react";
import { Product } from "@/interfaces/Product";
import { Context } from "../TableContext";
import { useRouter } from "next/navigation";
import { formatThaiDate } from "@/lib/dateHumanize";
import Image from "next/image";

interface TableRowProps {
  product: Product;
  isSelected: boolean;
  onRowClick: (id: number) => void; // Function to handle row click
}

const TableRow: React.FC<TableRowProps> = ({
  product,
  isSelected,
  onRowClick,
}) => {
  const { setID } = useContext(Context);

  const setProductID = (id: number) => {
    setID(id);
    // console.log("Set id from Tablerow.tsx: " + id)
  };

  const handleClick = () => {
    onRowClick(product.id);
    setProductID(product.id);
    // console.log("id " + product.id + " is set in handleClick() in Tablerow.tsx")
  };

  const router = useRouter();

  return (
    <tr
      className={`
      h-[100px] border-b last:border-none border-gray-300 cursor-pointer
      ${isSelected ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"}
    `}
      onClick={handleClick}
    >
      <td className="break-words border border-gray-300 p-2">{product.id}</td>
      <td className="break-words border-r border-gray-300 p-2">
        {product.name}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {product.description?.length! > 50
          ? `${product.description?.slice(0, 50)}...`
          : product.description}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        <Image
          alt="Product Image"
          src={product.imageUrl || "/images/no_image.jpg"}
          width={100}
          height={100}
        />
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {product.patternAndType}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {product.wheel}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {product.type}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {formatThaiDate(product.createdAt)}
      </td>
      <td className="break-words border-r border-gray-300 p-2">
        {formatThaiDate(product.updatedAt)}
      </td>

      <td className=" border gap-2 px-2 h-[100px] flex flex-row relative items-center justify-center text-center">
        <button
          className="btn text-white bg-blue-500 px-2 py-1 text-sm mx-3"
          onClick={(event) => {
            event.stopPropagation();
            console.log("View detail!");
            router.push(`stock-management/${product.id}`);
          }}
        >
          View detail
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
