"use client";
import React, { useState } from "react";
import TableRow from "../components/TableRow";
import useProduct from "@/api/user/useProduct";
import SearchBar from "../components/SearchBar";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "@/interfaces/Product";

const Table = () => {
    const router = useRouter();
    const { data: products } = useProduct();
    const [selectedID, setSelectedID] = useState<number | null>(null);
    const { register, handleSubmit, reset, getValues } = useForm<Product>({
        defaultValues: {
            name: "",
            description: "",
            patternAndType: "",
            wheel: "",
            type: "",
            imageUrl: ""
        }
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

    const submitHandler: SubmitHandler<Product> = (data) => {
        const exists = products?.some(product => product.name === data.name);
        if (exists) {
            console.log("This product is already exist")
        }
        else {
            console.log("Submitting:", data); // Log the submitted data
            // Add code to send product data to the backend here

            reset(); // Reset form fields
            setSelectedID(null); // Optionally reset selected ID
        }
    };

    const updateHandler = () => {
        console.log(selectedID)
        const updatedProduct = { ...getValues() }
        console.log("Updated product:" + updatedProduct.name)
    };

    return (
        <div className="flex ">
            <div className="p-10 overflow-x-auto w-full bg-white ">
                <h1 className="font-bold text-2xl mb-4">Stock Management</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                {...register("name")}
                                id="name"
                                name="name"
                                className="w-full p-2 border rounded-md"
                                placeholder="Product name"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                {...register("description")}
                                id="description"
                                name="description"
                                className="w-full p-2 border rounded-md"
                                placeholder="Description"
                            />
                        </div>
                        <div>
                            <label htmlFor="patternAndType" className="block text-sm font-medium text-gray-700 mb-1">Pattern and Type</label>
                            <input
                                {...register("patternAndType")}
                                id="patternAndType"
                                name="patternAndType"
                                className="w-full p-2 border rounded-md"
                                placeholder="Pattern and Type"
                            />
                        </div>
                        <div>
                            <label htmlFor="wheel" className="block text-sm font-medium text-gray-700 mb-1">Wheel</label>
                            <input
                                {...register("wheel")}
                                id="wheel"
                                name="wheel"
                                className="w-full p-2 border rounded-md"
                                placeholder="Wheel"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <input
                                {...register("type")}
                                id="type"
                                name="type"
                                className="w-full p-2 border rounded-md"
                                placeholder="Type"
                            />
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                {...register("imageUrl")}
                                id="imageUrl"
                                name="imageUrl"
                                className="w-full p-2 border rounded-md file-input-bordered file-input"
                                type="file"
                            />
                        </div>
                    </div>
                    <div className="gap-1 mt-[50px] mb-[10px] flex justify-start">
                        <button className="btn bg-[#387ADF] hover:bg-[#2558a5] text-white" type='submit'>
                            Create
                        </button>
                        <button className="btn bg-slate-200" onClick={(data)=>{updateHandler(data)}} type="button">
                            Update
                        </button>
                        <button className="btn bg-[#EC5A5A] hover:bg-[#ff4a4a] text-white">
                            Delete
                        </button>
                    </div>
                </form>

                <div className="mb-4 mt-2">
                    <SearchBar />
                </div>

                <table className="shadow-lg border-collapse min-w-full table-auto justify-center text-center">
                    <thead className="border-y border-gray-300">
                        <tr>
                            <th className="p-2 border border-gray-300">ID</th>
                            <th className="p-2 border border-gray-300">Name</th>
                            <th className="p-2 border border-gray-300">Description</th>
                            <th className="p-2 border border-gray-300">Image</th>
                            <th className="p-2 border border-gray-300">Pattern & Type</th>
                            <th className="p-2 border border-gray-300">Wheel</th>
                            <th className="p-2 border border-gray-300">Type</th>
                            <th className="p-2 border border-gray-300">Created At</th>
                            <th className="p-2 border border-gray-300">Updated At</th>
                            <th className="p-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((item) => (
                            <TableRow
                                key={item.id}
                                product={item}
                                isSelected={selectedID === item.id} // Pass selection state
                                onRowClick={() => { handleRowClick(item) }} // Pass row click handler
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
