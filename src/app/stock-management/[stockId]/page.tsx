"use client";
import React, { useState } from "react";
import TableRow from "../../components/TableRow";
import useProduct from "@/api/user/useProduct";
import SearchBar from "../../components/SearchBar";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductSize } from "@/interfaces/Product";
import ProductDetailTableRow from "../../components/ProductDetailTableRow";
import { useParams } from "next/navigation";

const ProductDetail = () => {
    const router = useRouter();
    const {stockId} = useParams();
    const { data: products } = useProduct();
    const [selectedID, setSelectedID] = useState<number | null>(null);
    const { register, handleSubmit, reset, getValues } = useForm<ProductSize>({
        defaultValues: {
          productId: 0,
          name: "",
          overallDiameter: 0,
          overallWidth: 0,
          measurementRim: "",
          standardRim: "",
          price: 0,
          quantity: 0,
          createdAt: "",
          updatedAt: ""
        }
    });

    const handleRowClick = (product: ProductSize) => {
        if (selectedID === product.id) {
            setSelectedID(null);
            reset(); // Reset the form when deselecting
        } else {
            setSelectedID(product.id);
            reset(product); // Populate the form with selected product's details
        }
    };

    const submitHandler: SubmitHandler<ProductSize> = (data) => {
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
        const updatedProduct = {...getValues()}
        console.log("Updated product:" + updatedProduct.name)
    };

    return (
        <div className="flex ">
            <div className="p-10 overflow-x-auto w-full bg-white ">
                <h1 className="font-bold text-2xl mb-4">Stock Management</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input {...register("name")} id="name" className="w-full p-2 border rounded" placeholder="Product name" />
    </div>
    <div>
        <label htmlFor="overallDiameter" className="block text-sm font-medium text-gray-700 mb-1">Overall Diameter</label>
        <input {...register("overallDiameter")} id="overallDiameter" className="w-full p-2 border rounded" placeholder="Overall Diameter" />
    </div>
    <div>
        <label htmlFor="overallWidth" className="block text-sm font-medium text-gray-700 mb-1">Overall Width</label>
        <input {...register("overallWidth")} id="overallWidth" className="w-full p-2 border rounded" placeholder="Overall Width" />
    </div>
    <div>
        <label htmlFor="measurementRim" className="block text-sm font-medium text-gray-700 mb-1">Measurement Rim</label>
        <input {...register("measurementRim")} id="measurementRim" className="w-full p-2 border rounded" placeholder="Measurement Rim" />
    </div>
    <div>
        <label htmlFor="standardRim" className="block text-sm font-medium text-gray-700 mb-1">Standard Rim</label>
        <input {...register("standardRim")} id="standardRim" className="w-full p-2 border rounded" placeholder="Standard Rim" />
    </div>
    <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input {...register("price")} id="price" className="w-full p-2 border rounded" placeholder="Price" />
    </div>
    <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
        <input {...register("quantity")} id="quantity" className="w-full p-2 border rounded" placeholder="Quantity" />
    </div>
    <div>
        <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
        <input {...register("createdAt")} id="createdAt" className="w-full p-2 border rounded" placeholder="Created At" />
    </div>
    <div>
        <label htmlFor="updatedAt" className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
        <input {...register("updatedAt")} id="updatedAt" className="w-full p-2 border rounded" placeholder="Updated At" />
    </div>
</div>


                    {/* Button */}
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

                <div className="mb-4">
                    <SearchBar />
                </div>

                <table className="shadow-lg border-collapse min-w-full table-auto justify-center text-center">
                    <thead className="border-y border-gray-300">
                        <tr>
                            <th className="p-2 border border-gray-300">ID</th>
                            <th className="p-2 border border-gray-300">product id</th>
                            <th className="p-2 border border-gray-300">name</th>
                            <th className="p-2 border border-gray-300">overall diameter</th>
                            <th className="p-2 border border-gray-300">overall width</th>
                            <th className="p-2 border border-gray-300">measurement rim</th>
                            <th className="p-2 border border-gray-300">standard rim</th>
                            <th className="p-2 border border-gray-300">price</th>
                            <th className="p-2 border border-gray-300">quantity</th>  
                            <th className="p-2 border border-gray-300">updated at</th>
                            <th className="p-2 border border-gray-300">created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((item) => (
                            <ProductDetailTableRow
                                key={item.id}
                                productDetail={item.productSizes}
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

export default ProductDetail;
