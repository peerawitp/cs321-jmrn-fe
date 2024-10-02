"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Product } from "../types/product";
import { Context } from "../TableContext";
import { product } from "../../../public/data/data";
import { useForm } from "react-hook-form";

interface UpdateFormProps {
    closePopUp: () => void; // Function with no arguments, returning nothing
}

const findProductByID = (id: string) => {
    return product.find((product) => product.id === id);
};

const Form = () => {
    const { register } = useForm();

    const { id } = useContext(Context);
    console.log(id);
    const [formData, setFormData] = useState<Product>({
        id: "",
        name: "",
        description: "",
        imageURL: "",
        TireSize: "",
        PatternAndType: "",
        OverAllDiameter: 0,
        OverAllWidth: 0,
        MeasurementRim: "",
        StandardRim: "",
        Wheel: "",
        Type: "",
        Quantity: 0,
        Price: 0,
        createdAt: "",
        updatedAt: "",
    });

    function makeProductObj(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        console.log("ID ---->" + id);
    }

    console.log(formData);

    useEffect(() => {
        if (id === null) return;
        const product = findProductByID(id);
        if (product === undefined) return;
        setFormData(product);
    }, [id]);

    return (
        <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50">
            <div className="p-5 h-[600px] w-[500px] bg-slate-200 rounded-md overflow-y-auto ">
                <div className="overflow-y-auto p-5 bg-slate-200 w-[500px] h-[600px] rounded-md">
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                ID
                            </label>
                            <input
                                name="id"
                                id="id"
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full mt-1"
                                onChange={makeProductObj}
                                value={formData.id}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full mt-1"
                                onChange={makeProductObj}
                                value={formData.name}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                id="description"
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full mt-1"
                                onChange={makeProductObj}
                                value={formData.description}
                            />
                        </div>

                        <div className="flex justify-end">
                            <div className="">
                                <button className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                    Close
                                </button>
                            </div>

                            <div className="ml-5">
                                <button
                                    onClick={() => console.log(formData)}
                                    className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
