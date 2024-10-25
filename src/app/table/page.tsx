"use client";
import React, { useContext, useState } from "react";
import TableRow from "../components/TableRow";
import { product } from "../../../public/data/data";
import { Context } from "../TableContext";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";
import SearchBar  from "../components/SearchBar"

const Table = () => {
    const [showCreatePopUp, setShowCreatePopUp] = useState(false);
    const [showUpdatePopUp, setShowPopUp] = useState(false);
    const [id, setID] = useState<string | null>(null);

    const [selectedID, setSelectedID] = useState<string | null>(null); // Track selected row

    const handleRowClick = (id: string) => {
        setSelectedID(id); // Update selected row ID
        setID(id);
        console.log("change id from Table.tsx: " + id);
    };


    const handleUpdateOpenPopUp = () => {
        if (id === null) {
            alert("Select product first");
        }
        else {
            setShowPopUp(true); // Show pop-up
        }

    };
    const handleUpdateClosePopUp = () => {
        setShowPopUp(false); // Show pop-up
    };

    const handleCreateOpenPopUp = () => {
        setShowCreatePopUp(true)
    }

    const handleCreateClosePopUp = () => {
        setShowCreatePopUp(false)
    }


    return (
        <div className="flex">
            <div className="overflow-x-auto w-full bg-white text-black">
                {/* button */}
                <div className="gap-1 mt-[50px] mb-[10px] flex justify-start">
                    <button
                        className=" btn bg-[#387ADF] hover:bg-[#2558a5] text-white"
                        onClick={handleCreateOpenPopUp}
                    >
                        Create
                    </button>
                    <button
                        className=" btn btn-ghost bg-white"
                        onClick={handleUpdateOpenPopUp}
                    >
                        Update
                    </button>
                    <button className=" btn bg-[#EC5A5A] hover:bg-[#ff4a4a] text-white">
                        Delete
                    </button>
                </div>

                {/* <input className="mr-3 my-[10px] p-[5px] border-2 w-60 border-cyan-900 rounded-md" placeholder="type to search..."/> */}

                <div className="mb-4">
                    <SearchBar/>
                </div>

                <table className="min-w-full table-auto justify-center text-center">
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
                {showCreatePopUp && (
                    <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50">
                        <div className="mt-20">
                            <CreateForm closePopUp={handleCreateClosePopUp} />
                        </div>
                    </div>
                )}

                {showUpdatePopUp && (
                    <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50">
                        <div className="mt-20">
                            <UpdateForm closePopUp={handleUpdateClosePopUp} id={id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;
