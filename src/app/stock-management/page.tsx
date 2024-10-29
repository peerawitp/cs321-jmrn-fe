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
import useAddProduct from "@/api/employee/useAddProduct";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateProduct from "@/api/employee/useUpdateProduct";
import { UpdateProduct } from "@/interfaces/UpdateProduct";

const Table = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
  const { data: products } = useProduct();
    const [selectedID, setSelectedID] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
    const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm<AddProduct>({
        defaultValues: {
            name: "",
            description: "",
            patternAndType: "",
            wheel: "" as WheelType,
            type: "" as TireType,
              },
    });

  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const queryClient = useQueryClient();

    const handleRowClick = (product: Product) => {
        if (selectedID === product.id) {
            setSelectedID(null);
            reset();
        } else {
            setSelectedID(product.id);
            reset(product); // Populate the form with selected product's details
        }
    setFile(null);
    const input = document.getElementById("image") as HTMLInputElement;
    input.value = "";
    };

    const submitHandler: SubmitHandler<AddProduct> = async (data) => {
        const exists = products?.some((product) => product.name === data.name);
        if (exists) {
            alert("Product already exists");
        } else {
            console.log("Submitting:", data); // Log the submitted data
            setIsLoading(true);

      await addProductMutation.mutateAsync(
        { ...data, image: file },
        {
          onSuccess: () => {
            alert("Product added successfully!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsLoading(false);
          },
          onError: (error) => {
            alert("An error occurred. " + error.message);

            setIsLoading(false);
          },
        },
      );

            reset(); // Reset form fields
            setSelectedID(null); // Optionally reset selected ID
        }
    };

  const updateHandler = async () => {
    console.log(selectedID);
    if (!selectedID) {
      alert("Please select a product to update");
      return;
    }

    // map with UpdateProduct interfaces
    const updateProductForm: UpdateProduct = {
      id: selectedID,
      name: getValues("name"),
      description: getValues("description") || undefined,
      patternAndType: getValues("patternAndType"),
      wheel: getValues("wheel"),
      type: getValues("type"),
      image: file || undefined,
    };

    setIsLoading(true);

    await updateProductMutation.mutateAsync(
      { ...updateProductForm },
      {
        onSuccess: () => {
          alert("Product updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          setIsLoading(false);
        },
        onError: (error) => {
          alert("An error occurred. " + error.message);

          setIsLoading(false);
        },
      },
    );
  };

  // Custom file change handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    console.log(fileList);
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

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
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="text-center mt-4">
              <p>Updating product...</p>
              <div className="loader"></div>
            </div>
          )}

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

      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3; /* Light grey */
          border-top: 6px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default Table;
