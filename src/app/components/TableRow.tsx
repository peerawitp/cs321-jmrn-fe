'use client'
import React, { useContext } from "react";
import { Product } from "../types/product";
import { Context } from "../TableContext";

interface TableRowProps {
  product: Product;
  isSelected: boolean;
  onRowClick: (id: string) => void; // Function to handle row click
}

const TableRow: React.FC<TableRowProps> = ({ product, isSelected, onRowClick }) => {
  const { setID } = useContext(Context);

  const setProductID = (id: string) => {
    setID(id);
    console.log("Set id from Tablerow.tsx: " + id)
  };

  const handleClick = () => {
    onRowClick(product.id);
    setProductID(product.id);
    console.log("id " + product.id + " is set in handleClick() in Tablerow.tsx")
  }

  return (
    <tr
      className={`h-[100px] border-b last:border-none border-gray-300 cursor-pointer ${
        isSelected ? 'bg-gray-300' : 'hover:bg-gray-200'
      }`}
      onClick={
        handleClick
      }
    >
      <td className="break-words border-r border-gray-300 p-2">{product.id}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.name}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.description}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.imageURL}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.TireSize}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.PatternAndType}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.OverAllDiameter}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.OverAllWidth}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.MeasurementRim}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.StandardRim}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.Wheel}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.Type}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.Quantity}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.Price}</td>
      <td className="break-words border-r border-gray-300 p-2">{product.createdAt}</td>
      <td className="break-words p-2">{product.updatedAt}</td>
    </tr>
  );
};

export default TableRow;
