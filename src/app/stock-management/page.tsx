"use client";
import React, { useState } from "react";
import TableRow from "../components/TableRow";
import useProduct from "@/api/user/useProduct";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "@/interfaces/Product";
import { WheelType } from "@/enums/WheelType";
import { TireType } from "@/enums/TireType";
import { AddProduct } from "@/interfaces/AddProduct";

const Table = () => {
    const router = useRouter();
    const { data: products } = useProduct();
    const [selectedID, setSelectedID] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
    const { register, handleSubmit, reset, getValues } = useForm<AddProduct>({
        defaultValues: {
            name: "",
            description: "",
            patternAndType: "",
            wheel: "" as WheelType,
            type: "" as TireType,
            image: null,
        },
    });

    const handleRowClick = (product: Product) => {
        if (selectedID === product.id) {
            setSelectedID(null);
            reset(); // Reset the form when deselecting
        } else {
            setSelectedID(product.id);
            reset(product); // Populate the form with selected product's details
        }
    };

    const submitHandler: SubmitHandler<AddProduct> = (data) => {
        const exists = products?.some((product) => product.name === data.name);
        if (exists) {
            console.log("This product is already exist");
        } else {
            console.log("Submitting:", data); // Log the submitted data
            // Add code to send product data to the backend here

            reset(); // Reset form fields
            setSelectedID(null); // Optionally reset selected ID
        }
    };

    const updateHandler = () => {
        console.log(selectedID);
        const updatedProduct = { ...getValues() };
        console.log("Updated product:" + updatedProduct.name);
    };

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex ">
            <div className="p-10 overflow-x-auto w-full bg-white ">
                <h1 className="font-bold text-2xl mb-4">Stock Management</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Product Name
                            </label>
                            <input
                                {...register("name")}
                                id="name"
                                name="name"
                                className="w-full p-2 border rounded-md"
                                placeholder="Product name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <input
                                {...register("description")}
                                id="description"
                                name="description"
                                className="w-full p-2 border rounded-md"
                                placeholder="Description"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="patternAndType"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Pattern and Type
                            </label>
                            <input
                                {...register("patternAndType")}
                                id="patternAndType"
                                name="patternAndType"
                                className="w-full p-2 border rounded-md"
                                placeholder="Pattern and Type"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="wheel"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Wheel
                            </label>
                            <select
                                {...register("wheel")}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select Wheel Type</option>
                                {Object.values(WheelType).map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Type
                            </label>
                            <select
                                {...register("type")}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select Tire Type</option>
                                {Object.values(TireType).map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Image
                            </label>
                            <input
                                {...register("image")}
                                id="image"
                                name="image"
                                className="w-full p-2 border rounded-md file-input-bordered file-input"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className="gap-1 mt-[50px] mb-[10px] flex justify-start">
                        <button
                            className="btn bg-[#387ADF] hover:bg-[#2558a5] text-white"
                            type="submit"
                        >
                            Create
                        </button>
                        <button
                            className="btn bg-slate-200"
                            onClick={() => {
                                updateHandler();
                            }}
                            type="button"
                        >
                            Update
                        </button>
                        <button className="btn bg-[#EC5A5A] hover:bg-[#ff4a4a] text-white">
                            Delete
                        </button>
                    </div>
                </form>

                <div className="mb-4 mt-2">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                <div className="overflow-y-auto max-h-60"> {/* Adjust max-height as needed */}
                    <table className="shadow-lg border-collapse min-w-full table-auto justify-center text-center">
                        <thead className="border-y border-gray-300 sticky top-0 bg-white z-10">
                            <tr>
                                <th className="p-2 border border-gray-300">ID</th>
                                <th className="p-2 border border-gray-300">Product ID</th>
                                <th className="p-2 border border-gray-300">Name</th>
                                <th className="p-2 border border-gray-300">Overall Diameter</th>
                                <th className="p-2 border border-gray-300">Overall Width</th>
                                <th className="p-2 border border-gray-300">Measurement Rim</th>
                                <th className="p-2 border border-gray-300">Standard Rim</th>
                                <th className="p-2 border border-gray-300">Price</th>
                                <th className="p-2 border border-gray-300">Quantity</th>
                                <th className="p-2 border border-gray-300">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts &&
                                filteredProducts.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        product={item}
                                        isSelected={selectedID === item.id}
                                        onRowClick={() => handleRowClick(item)}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
