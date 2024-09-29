'use client'
import React, { useContext, useState } from 'react';
import TableRow from '../components/TableRow';
import { product } from '../../../public/data/data';
import { Context } from "../TableContext";

const Table = () => {
    
    const { setID } = useContext(Context);

    const [selectedID, setSelectedID] = useState<string | null>(null); // Track selected row

    const handleRowClick = (id: string) => {
        setSelectedID(id); // Update selected row ID
        setID(id);
        console.log("change id from Table.tsx: " + id)
    };



    return (
        <div className="flex justify-center text-center">
            <div className="overflow-x-auto w-full bg-white text-black">
                <table className="min-w-full table-auto">
                    <thead className="text-xs sm:text-sm bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="p-2 border-r border-gray-300">ID</th>
                            <th className="p-2 border-r border-gray-300">Name</th>
                            <th className="p-2 border-r border-gray-300">Description</th>
                            <th className="p-2 border-r border-gray-300">Image</th>
                            <th className="p-2 border-r border-gray-300">Tire Size</th>
                            <th className="p-2 border-r border-gray-300">Pattern & Type</th>
                            <th className="p-2 border-r border-gray-300">Overall Diameter</th>
                            <th className="p-2 border-r border-gray-300">Overall Width</th>
                            <th className="p-2 border-r border-gray-300">Measurement Rim</th>
                            <th className="p-2 border-r border-gray-300">Standard Rim</th>
                            <th className="p-2 border-r border-gray-300">Wheel</th>
                            <th className="p-2 border-r border-gray-300">Type</th>
                            <th className="p-2 border-r border-gray-300">Quantity</th>
                            <th className="p-2 border-r border-gray-300">Price</th>
                            <th className="p-2 border-r border-gray-300">Created At</th>
                            <th className="p-2 border-r border-gray-300">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                    {product.map((item) => (
                            <TableRow 
                                key={item.id} 
                                product={item} 
                                isSelected={selectedID === item.id} // Pass selection state
                                onRowClick={handleRowClick} // Pass row click handler
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
